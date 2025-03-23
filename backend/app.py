# app.py
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
from models import User  # Your custom User model from models.py
from cohere_utils import rerank_cohere  # Updated import for other features

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config["MONGODB_URI"] = os.environ.get("MONGODB_URI")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev")

# Initialize the database connection
with app.app_context():
    db = init_db()

# Configure server-side session using MongoDB
app.config.update(
    SESSION_TYPE='mongodb',
    SESSION_MONGODB=db.client,
    SESSION_MONGODB_DB='bd',
    SESSION_MONGODB_COLLECT='sessions',
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SECURE=False,  # Set True in production (with HTTPS)
    SESSION_COOKIE_SAMESITE='Lax',
    PERMANENT_SESSION_LIFETIME=timedelta(days=7),
)
Session(app)

# Initialize CORS (allow credentials)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "supports_credentials": True,
        "allow_headers": ["Content-Type"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
})

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "/login"

@login_manager.user_loader
def load_user(user_id):
    user_data = db.users.find_one({"email": user_id})
    if user_data:
        return User(user_data)
    return None

# --- Existing endpoints for home, register, login, logout, CV upload, etc. ---
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend is running!"})

@app.route("/register", methods=["POST"])
def register():
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
    if db.users.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 409
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    user_data = {
        "email": email,
        "password": hashed_pw,
        "first_name": first_name,
        "last_name": last_name,
        "account_type": account_type
    }
    db.users.insert_one(user_data)
    # Optionally, create a blank profile in a separate collection:
    db.profiles.insert_one({
        "email": email,
        "job_title": "",
        "description": "",
        "skills": [],
        "experience": []
    })
    return jsonify({"message": "Registration successful"}), 201

@app.route("/login", methods=["POST"])
def login():
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

@app.route("/logout", methods=["POST"])
def logout():
    session.pop('user', None)
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

@app.route("/candidate/cv-upload-api", methods=["POST"])
def add_cv():
    try:
        user_data = session.get('user')
        if not user_data:
            return jsonify({"error": "Not authenticated"}), 401
        cv_file = request.files.get("cv")
        if not cv_file:
            return jsonify({"error": "Missing cv"}), 400
        file_content = cv_file.read()
        binary_content = Binary(file_content)
        user_email = user_data.get('email')
        if not user_email:
            return jsonify({"error": "Invalid session data"}), 401
        result = db.users.update_one(
            {"email": user_email},
            {"$set": {"cv_pdf": binary_content}}
        )
        if result.modified_count > 0:
            return jsonify({"message": "CV uploaded successfully"}), 200
        else:
            return jsonify({"error": "Failed to update CV"}), 500
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

# --- New: Add endpoints for profile management ---
@app.route("/profile", methods=["GET"])
def get_profile():
    user_data = session.get('user')
    if not user_data:
        return jsonify({"error": "Not authenticated"}), 401
    profile = db.profiles.find_one({"email": user_data["email"]}, {"_id": 0})
    if profile:
        return jsonify(profile), 200
    return jsonify({"error": "Profile not found"}), 404

@app.route("/profile", methods=["PUT"])
def update_profile():
    user_data = session.get('user')
    if not user_data:
        return jsonify({"error": "Not authenticated"}), 401
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    result = db.profiles.update_one(
        {"email": user_data["email"]},
        {"$set": data}
    )
    if result.modified_count > 0:
        return jsonify({"message": "Profile updated successfully"}), 200
    else:
        return jsonify({"message": "No changes made"}), 200

# --- Now, add signaling support for calling via SocketIO ---
from flask_socketio import SocketIO, emit, join_room, leave_room
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:3000", "http://127.0.0.1:3000", "https://cvue.onrender.com"])

@socketio.on("join")
def handle_join(data):
    room = data.get("room")
    join_room(room)
    emit("status", {"msg": f"{session.get('user', {}).get('email', 'Unknown')} has joined the room."}, room=room)

@socketio.on("offer")
def handle_offer(data):
    room = data.get("room")
    offer = data.get("offer")
    emit("offer", {"offer": offer, "from": session.get('user', {}).get('email')}, room=room, include_self=False)

@socketio.on("answer")
def handle_answer(data):
    room = data.get("room")
    answer = data.get("answer")
    emit("answer", {"answer": answer, "from": session.get('user', {}).get('email')}, room=room, include_self=False)

@socketio.on("ice-candidate")
def handle_ice_candidate(data):
    room = data.get("room")
    candidate = data.get("candidate")
    emit("ice-candidate", {"candidate": candidate, "from": session.get('user', {}).get('email')}, room=room, include_self=False)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    # Run with SocketIO (required for signaling)
    socketio.run(app, host="0.0.0.0", port=port, debug=True)
