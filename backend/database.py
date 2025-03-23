import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from flask import current_app


def init_db():
    uri = current_app.config["MONGODB_URI"]
    print("Connecting to MongoDB using URI:", uri)

    client = MongoClient(uri, server_api=ServerApi('1'))

    try:
        client.admin.command("ping")
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print("Error pinging MongoDB:", e)

    return client["bd"]


def extract_user_cvs(db):
    """
    Extrait tous les utilisateurs avec leur _id et leur champ 'cv_pdf'.

    Args:
        db: Instance de la base de données MongoDB.

    Returns:
        Une liste de dictionnaires contenant '_id' et 'cv_pdf'.
    """
    collection = db["cvs"]  # Remplace par le nom réel de ta collection si nécessaire

    return [
        {
            "_id": str(doc["_id"]),  # On convertit l'ObjectId en string
            "cv_pdf": doc["cv_pdf"]
        }
        for doc in collection.find({"cv_pdf": {"$exists": True}})
    ]
