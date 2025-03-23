import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import bcrypt
from werkzeug.utils import secure_filename
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user


# Load environment variables if you want to use them (e.g., SECRET_KEY)
load_dotenv()

app = Flask(__name__)
app.config["MONGO_MONGODB_URI"] = os.getenv("MONGODB_URI", "fallback-secret-key")

# Import the `db` object from database.py
from database import init_db
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


@app.route("/cv-upload", methods=["POST"])
def add_cv():
    """
    Add a CV to the user's profile.
    Body: {"cv": "<file>" }
    """
    cv_file = request.files.get("cv")

    if not cv_file:
        return jsonify({"error": "Missing cv"}), 400

    # Secure the filename
    filename = secure_filename(cv_file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    # Save the file
    cv_file.save(filepath)

    # Update the user's profile with the CV filepath
    db.users.update_one(
        {"email": current_user.email},
        {"$set": {"cv_path": filepath}}
    )

    return jsonify({"message": "CV uploaded successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)
