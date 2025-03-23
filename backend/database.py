import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from flask import current_app


def init_db():
    uri = current_app.config["MONGO_MONGODB_URI"]

    client = MongoClient(uri, server_api=ServerApi('1'))

    try:
        client.admin.command("ping")
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print("Error pinging MongoDB:", e)

    return client["bd"]