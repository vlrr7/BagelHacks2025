from database import init_db, debug_print_user
import os
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from bson import Binary
from dotenv import load_dotenv
from flask_session import Session
from datetime import timedelta

import bcrypt
from werkzeug.utils import secure_filename
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from database import extract_user_cvs
from cohere_utils import rerank_cohere  # Updated import
from models import User

# Load environment variables if you want to use them (e.g., SECRET_KEY)
load_dotenv()

app = Flask(__name__)

# First set the MongoDB URI
app.config["MONGODB_URI"] = os.environ.get('MONGODB_URI')  # Remove the trailing comma!

# Initialize the database connection first
with app.app_context():
    db = init_db()

# Then configure the session with the existing MongoDB connection
app.config.update(
    SECRET_KEY=os.environ.get('SECRET_KEY', 'dev'),
    SESSION_TYPE='mongodb',
    SESSION_MONGODB=db.client,  # Use the client from our db connection
    SESSION_MONGODB_DB='bd',
    SESSION_MONGODB_COLLECT='sessions',
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SECURE=False,  # Set to True in production with HTTPS
    SESSION_COOKIE_SAMESITE='Lax',
    PERMANENT_SESSION_LIFETIME=timedelta(days=7),  # Add this line
)

# Initialize Session after all configs are set
Session(app)

# Then initialize CORS
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "supports_credentials": True,
        "allow_headers": ["Content-Type"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
})


# Initialize the login manager
login_manager = LoginManager()
login_manager.init_app(app)

# User loader callback


@login_manager.user_loader
def load_user(user_id):
    user_data = db.users.find_one({"email": user_id})
    if (user_data):
        return User(user_data)
    return None

############################################
#              TEST ROUTE
############################################


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend is running!"})

############################################
#              AUTH ROUTES
############################################


@app.route("/register", methods=["POST"])
def register():
    """
    Register a new user.
    Body: { "email": "<str>", "password": "<str>", "firstName": "<str>", "lastName": "<str>", "accountType": "<str>" }
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get("email")
    password = data.get("password")
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    account_type = data.get("accountType")

    if not all([email, password, first_name, last_name, account_type]):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if user already exists
    existing_user = db.users.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    # Hash the password using bcrypt
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    user_data = {
        "email": email,
        "password": hashed_pw,
        "first_name": first_name,
        "last_name": last_name,
        "account_type": account_type
    }

    # Insert into the 'users' collection
    db.users.insert_one(user_data)

    return jsonify({"message": "Registration successful"}), 201


@app.route("/login", methods=["POST"])
def login():
    """
    Login an existing user.
    Body: { "email": "<str>", "password": "<str>" }
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user_data = db.users.find_one({"email": email})
    if not user_data:
        return jsonify({"error": "User not found"}), 404

    if bcrypt.checkpw(password.encode("utf-8"), user_data["password"]):
        session.permanent = True
        session['user'] = {
            'email': user_data['email'],
            'first_name': user_data['first_name'],
            'last_name': user_data['last_name'],
            'account_type': user_data['account_type']
        }
        return jsonify({
            "message": "Login successful",
            "user": session['user']
        }), 200
    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/check-auth", methods=["GET"])
def check_auth():
    # First check session
    user_data = session.get('user')
    if user_data:
        return jsonify(user_data)
    
    # If no session, check if user is logged in via flask-login
    if current_user.is_authenticated:
        return jsonify(current_user.to_dict())
    
    return jsonify({"error": "Not authenticated"}), 401

@app.route("/logout", methods=["POST"])
def logout():
    session.pop('user', None)
    return jsonify({"message": "Logged out successfully"}), 200

@app.route("/candidate/cv-upload-api", methods=["POST"])
def add_cv():
    try:
        user_data = session.get('user')
        if not user_data:
            print("No user in session")
            return jsonify({"error": "Not authenticated"}), 401

        cv_file = request.files.get("cv")
        if not cv_file:
            print("No file in request")
            return jsonify({"error": "Missing cv"}), 400

        file_content = cv_file.read()
        binary_content = Binary(file_content)

        user_email = user_data.get('email')
        if not user_email:
            print("No email in session data")
            return jsonify({"error": "Invalid session data"}), 401

        print(f"Attempting to update CV for user: {user_email}")
        print(f"File size: {len(file_content)} bytes")

        # First verify user exists
        user = db.users.find_one({"email": user_email})
        if not user:
            print(f"User not found in database: {user_email}")
            return jsonify({"error": "User not found"}), 404

        # Try to update with detailed error logging
        try:
            result = db.users.update_one(
                {"email": user_email},
                {"$set": {"cv_pdf": binary_content}}
            )
            print(f"Update operation result: {result.raw_result}")
            print(f"Modified count: {result.modified_count}")
            print(f"Matched count: {result.matched_count}")
            print(f"Upserted ID: {result.upserted_id}")
            
        except Exception as db_error:
            print(f"Database operation error: {str(db_error)}")
            print(f"Error type: {type(db_error)}")
            return jsonify({"error": f"Database error: {str(db_error)}"}), 500

        # Verify the update
        updated_user = db.users.find_one({"email": user_email})
        if "cv_pdf" in updated_user:
            print("CV successfully stored in database")
            return jsonify({"message": "CV uploaded successfully"}), 200
        else:
            print("CV not found in database after update")
            return jsonify({"error": "Failed to verify CV upload"}), 500

    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        print(f"Error type: {type(e)}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route("/employer/dashboard", methods=["POST"])
def set_recruitment_pipeline():
    documents = extract_user_cvs(db)
    #input query instead of "recruitment pipeline"
    rerank_cohere("Recruitment pipeline", documents)

@app.route('/candidate/cv-delete', methods=['POST'])
def delete_cv():
    user_data = session.get('user')
    if not user_data:
        return jsonify({"error": "Not authenticated"}), 401

    user_email = user_data.get('email')
    if not user_email:
        return jsonify({"error": "Invalid session data"}), 401

    try:
        # First check if the user exists and has a CV
        user = db.users.find_one({"email": user_email})
        if not user:
            print(f"User not found: {user_email}")
            return jsonify({"error": "User not found"}), 404
            
        if "cv_pdf" not in user:
            print(f"No CV found for user: {user_email}")
            return jsonify({"error": "No CV found"}), 404

        # Now try to delete the CV
        result = db.users.update_one(
            {"email": user_email},
            {"$unset": {"cv_pdf": 1}}  # Use 1 instead of ""
        )
        
        print(f"Delete operation result: {result.raw_result}")  # Debug print
        
        if result.modified_count > 0:
            return jsonify({"message": "CV deleted successfully"}), 200
        else:
            print(f"No modifications made for user: {user_email}")
            return jsonify({"error": "No changes made"}), 400
            
    except Exception as e:
        print(f"Database error: {e}")
        return jsonify({"error": f"Database error: {str(e)}"}), 500

@app.route("/search-candidates", methods=["POST"])
def search_candidates():
    try:
        data = request.get_json()
        search_query = data.get('query')
        
        if not search_query:
            return jsonify({"error": "No search query provided"}), 400

        # Get all CVs from the database
        documents = extract_user_cvs(db)
        if not documents:
            return jsonify({"error": "No CVs found in the database"}), 404

        # Use Cohere to rank the documents
        ranked_results = rerank_cohere(search_query, documents)
        
        # Format results with user information
        formatted_results = []
        for result in ranked_results:
            user = db.users.find_one({"email": result["email"]})
            if user:
                formatted_results.append({
                    "email": result["email"],
                    "firstName": user.get("first_name"),
                    "lastName": user.get("last_name"),
                    "preview": result["text"][:200] + "...",  # First 200 characters of CV
                    "relevanceScore": result["relevance_score"]
                })

        return jsonify({"results": formatted_results}), 200

    except Exception as e:
        print(f"Search error: {str(e)}")
        return jsonify({"error": f"Search failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
