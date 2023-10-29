from firebase import firestore
from google.cloud import vision
# from flask import Flask, request, jsonify

# app = Flask(__name__)

# Detect text from image using Google Vision AI
def detect_text():
    # Get object_path from Firebase Cloud Storage
    # object_path = "not17.jpg"
    object_path = "pre1.jpeg"
    image_url = firestore.get_public_image_url(object_path)

    # Implement Google Vision AI
    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = image_url

    response = client.text_detection(image=image)
    texts = response.text_annotations
    print("\nOutput:")

    result = ""
    for text in texts:
        result += f"{text.description}"

    # Handle any errors that occur
    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )
    
    print(result)
    return result


# Parse data to get clear output
def parse_data(result):
    try:
        segments = result.split("Usage: ")[1:]
        parsed_strings = []

        # Iterate through the segments and extract the relevant information
        for segment in segments:
            if "Dosage: " in segment:
                usage, rest = segment.split("Dosage: ", 1)
            else:
                usage, rest = segment.split("Storage: ", 1)
            parsed_strings.append(usage)

        return parsed_strings
    except (ValueError, IndexError):
        # Handle the ValueError, which occurs when the expected split pattern is not found
        return ["Error: Parsing failed"]
    except Exception as e:
        # Handle other exceptions
        return ["Error: An unexpected error occurred"]


