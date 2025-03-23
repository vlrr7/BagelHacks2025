import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

# If you prefer to keep your URI secret, create a .env file and load from there:
# load_dotenv()
# uri = os.getenv("MONGODB_URI")

# For now, we’ll use your existing hardcoded URI:
uri = "mongodb+srv://rebeccaabc16:11qWvQaS5eEF89uT@bagelhacks2025.3rrrv.mongodb.net/?retryWrites=true&w=majority&appName=bagelHacks2025"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Test the connection (optional)
try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("Error pinging MongoDB:", e)

# Access a specific database (e.g., "bd" or "bagelhacksdb", whichever you prefer)
db = client["bd"]

# Now you can export `db` for use in other files
# Example usage in another file:
#   from database import db
#   users_collection = db.users
