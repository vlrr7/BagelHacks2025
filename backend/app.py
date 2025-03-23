# backend/app.py

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import bcrypt

# Import the `db` object from database.py
from database import db

# Load environment variables if you want to use them (e.g., SECRET_KEY)
load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "fallback-secret-key")

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



if __name__ == "__main__":
    app.run(debug=True)
