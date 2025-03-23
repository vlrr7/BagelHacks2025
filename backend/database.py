#database.py

import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from flask import current_app

load_dotenv()

def init_db():
    # Read the URI directly from environment variables instead of current_app:
    uri = current_app.config["MONGODB_URI"]
    if not uri:
        raise Exception("MONGODB_URI is not set in the environment.")

    client = MongoClient(uri, server_api=ServerApi('1'))
    try:
        client.admin.command("ping")
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print("Error pinging MongoDB:", e)

    return client["bd"]


def extract_user_cvs(db):
    """
    Extract all users with CV data from users collection.
    """
    # Use users collection instead of cvs
    return [
        {
            "_id": str(doc["_id"]),
            "cv_pdf": doc["cv_pdf"],
            "email": doc["email"]
        }
        for doc in db.users.find({"cv_pdf": {"$exists": True}})
    ]

# Add debug function
def debug_print_user(db, email):
    """Debug function to print user data"""
    user = db.users.find_one({"email": email})
    print(f"Debug - User data for {email}:", user)
    return user
