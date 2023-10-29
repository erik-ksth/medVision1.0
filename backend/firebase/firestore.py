import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from firebase_admin import firestore
from flask import Flask, request, jsonify

app = Flask(__name__)

cred = credentials.Certificate("/Users/aungbobo/Documents/CalHack10.0/MedVision/config/medvision-41de7-firebase-adminsdk-v1myc-15108de003.json")
firebase_admin.initialize_app(cred, {"storageBucket": "medvision-41de7.appspot.com"})
db = firestore.client()


# Get image_url from Firebase Cloud Storage
def get_public_image_url(object_path):
    try:
        # Initialize the storage client
        bucket = storage.bucket()

        # Construct the URL for the image object
        image_url = f"https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/{object_path}?alt=media"
        print(image_url)

        return image_url
    
    except Exception as e:
        # Handle any errors that occur
        print(f"Error getting image URL: {e}")
        return None


# Store user data in Firestore
@app.route('/api/process-image', methods=['POST'])
def store_data():
    # Get objectName from Front End using API
    data = request.get_json()
    object_path = data.get('objectName')
    # object_path = "part.jpg"  # Replace with the path to your image in Firebase Cloud Storage

    image_url = get_public_image_url(object_path)
    print(f"Public Image URL: {image_url}")

    # Store the public image url link in firestore
    document_path = "users/alovelace" # Replace with the actual path
    doc_ref = db.document(document_path)
    doc_ref.set({"image_url": image_url,}, merge = True)

    # Return image_url to Front End
    # results = {"image_url": image_url}
    # return jsonify(results)

