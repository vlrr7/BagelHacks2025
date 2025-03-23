from database import init_db
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from bson import Binary
from dotenv import load_dotenv

import bcrypt
from werkzeug.utils import secure_filename
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from database import extract_user_cvs
from cohere_utils import rerank_cohere  # Updated import

# Load environment variables if you want to use them (e.g., SECRET_KEY)
load_dotenv()

app = Flask(__name__)
app.config["MONGODB_URI"] = os.getenv("MONGODB_URI", "fallback-secret-key")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "fallback-secret-key")

# Import the `db` object from database.py
db = None
with app.app_context():
    db = init_db()


# Initialize the login manager
login_manager = LoginManager()
login_manager.init_app(app)

# User model


class User(UserMixin):
    def __init__(self, user_data):
        self.id = user_data['email']
        self.email = user_data['email']
        self.password = user_data['password']

# User loader callback


@login_manager.user_loader
def load_user(user_id):
    user_data = db.users.find_one({"email": user_id})
    if user_data:
        return User(user_data)
    return None


# Allow CORS requests (from your frontend on port 3000, for instance)
CORS(app, resources={r"/*": {"origins": "*"}})

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
    Body: { "email": "<str>", "password": "<str>" }
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    # Check if user already exists
    existing_user = db.users.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    # Hash the password using bcrypt
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    # Insert into the 'users' collection
    db.users.insert_one({
        "email": email,
        "password": hashed_pw
    })

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

    user = db.users.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Check the hashed password
    if bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        # Password matches
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401


@app.route("/candidate/cv-upload-api", methods=["POST"])
def add_cv():
    """
    Add a CV to the user's profile.
    Expects a file in the form field named "cv".
    """
    cv_file = request.files.get("cv")
    if not cv_file:
        return jsonify({"error": "Missing cv"}), 400

    # Read the file content as binary
    file_content = cv_file.read()
    binary_content = Binary(file_content)

    # If you are using Flask-Login, ensure the user is logged in.
    # For testing, you can temporarily update a test user's document:
    user_email = current_user.email if current_user.is_authenticated else "test@example.com"

    # Update the user's document in the database, storing the CV in a field (e.g., "cv_pdf")
    result = db.users.update_one(
        {"email": user_email},
        {"$set": {"cv_pdf": binary_content}}
    )

    if result.modified_count > 0:
        return jsonify({"message": "CV uploaded successfully"}), 200
    else:
        return jsonify({"error": "Failed to update CV"}), 500

@app.route("/employer/dashboard", methods=["POST"])
def set_recruitment_pipeline():
    documents = extract_user_cvs(db)
    #input query instead of "recruitment pipeline"
    rerank_cohere("Recruitment pipeline", documents)

@app.route('/candidate/cv-delete', methods=['POST'])
@login_required
def delete_cv():
    user_email = current_user.email  
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
