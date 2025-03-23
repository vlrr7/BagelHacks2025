from database import init_db
import os
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from bson import Binary
from dotenv import load_dotenv
from flask_session import Session

import bcrypt
from werkzeug.utils import secure_filename
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from database import extract_user_cvs
from cohere_utils import rerank_cohere  # Updated import
from models import User

# Load environment variables if you want to use them (e.g., SECRET_KEY)
load_dotenv()

app = Flask(__name__)
app.config.update(
    SECRET_KEY=os.environ.get('SECRET_KEY', 'dev'),
    MONGODB_URI=os.environ.get('MONGODB_URI'),
    SESSION_TYPE='filesystem',
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SECURE=False,  # Set to True in production with HTTPS
    SESSION_COOKIE_SAMESITE='Lax',
)

# Initialize Flask-Session
Session(app)

# Configure CORS
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "supports_credentials": True,
        "allow_headers": ["Content-Type"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
})

# Import the `db` object from database.py
db = None
with app.app_context():
    db = init_db()


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
        user = User(user_data)
        login_user(user)
        session['user'] = user.to_dict()  # Store user data in session
        return jsonify({
            "message": "Login successful",
            "user": user.to_dict()
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401


@app.route("/candidate/cv-upload-api", methods=["POST"])
def add_cv():
    # Remove @login_required temporarily for testing
    cv_file = request.files.get("cv")
    if not cv_file:
        return jsonify({"error": "Missing cv"}), 400

    file_content = cv_file.read()
    binary_content = Binary(file_content)

    # For testing, use a fixed email
    user_email = "test@example.com"

    result = db.users.update_one(
        {"email": user_email},
        {"$set": {"cv_pdf": binary_content}},
        upsert=True
    )

    if result.acknowledged:
        return jsonify({"message": "CV uploaded successfully"}), 200
    return jsonify({"error": "Failed to update CV"}), 500

@app.route("/employer/dashboard", methods=["POST"])
def set_recruitment_pipeline():
    documents = extract_user_cvs(db)
    #input query instead of "recruitment pipeline"
    rerank_cohere("Recruitment pipeline", documents)

@app.route('/candidate/cv-delete', methods=['POST'])
@login_required
def delete_cv():
    user_email = session.get('user', {}).get('email')
    if not user_email:
        return jsonify({"error": "User not authenticated"}), 401

    result = db.users.update_one(
        {"email": user_email},
        {"$unset": {"cv_pdf": ""}}
    )

    if result.modified_count > 0:
        return jsonify({"message": "CV deleted successfully"}), 200
    else:
        return jsonify({"error": "Failed to delete CV"}), 500
    

if __name__ == "__main__":
    app.run(debug=True)
