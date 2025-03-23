import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

# Load environment variables from a .env file if it exists
load_dotenv()

# Retrieve the MongoDB URI from environment variables
uri = os.getenv("MONGODB_URI", "fallback-secret-key")

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Test the connection (optional)
try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("Error pinging MongoDB:", e)

# Access a specific database (for example, "bd")
db = client["bd"]

# Now you can export `db` for use in other files
# Example usage in another file:
#   from database import db
#   users_collection = db.users
