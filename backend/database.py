from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import binary
import bcrypt

uri = "mongodb+srv://rebeccaabc16:11qWvQaS5eEF89uT@bagelhacks2025.3rrrv.mongodb.net/?retryWrites=true&w=majority&appName=bagelHacks2025"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
   
# Chemin vers le fichier PDF
chemin_pdf = '/Users/rebecca/Library/CloudStorage/OneDrive-polymtlus/uni/uni/CVs/SE/RebeccaAbiChahine_CV_VersionFrancais.pdf'

# Lecture du fichier PDF
with open(chemin_pdf, 'rb') as file:
    data_pdf = file.read()


# Hashage du mot de passe
password_hash = bcrypt.hashpw(b'mot_de_passe', bcrypt.gensalt())

# Création du document à insérer
document = {
    "username": "nom_utilisateur2",
    "password": password_hash,
    "cv_pdf": binary.Binary(data_pdf),
    "cv_parsed": "Contenu du CV analysé"
}

# Assure-toi de spécifier la collection correctement, par exemple db.maCollection
collection = client.bd.users
result = collection.insert_one(document)
print("Document inséré avec succès, ID:", result.inserted_id)




