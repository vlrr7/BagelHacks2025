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
