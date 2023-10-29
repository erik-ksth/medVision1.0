from my_modules import text_to_speech
from my_modules import together_ai as ta
from my_modules.vision_script import *
from playsound import playsound
from flask import Flask, request, jsonify
from api import api 

app = Flask(__name__)
    
@app.route('/api/process-together-ai', methods=['POST'])
def main():
    # Get text data from together.AI
    text = "Thank you for using MedVision, AI powered medical assistant for your healthy life. According to the input data, I provide the useful information for you. " + ta.process_text_with_together_ai()

    # Generate speech
    voice_name = "en-US-Standard-J"
    text_to_speech.text_to_wav(voice_name, text)
    audio_file = voice_name + ".wav"
    playsound(audio_file)

    # parsed_strings = parse_data(ta.process_text_with_together_ai())
    # results = {
    #     "Usage": parsed_strings[0],
    #     "Dosage": parsed_strings[1],
    #     "Storage": parsed_strings[2]
    # }

    # return jsonify(results)


# Main function
if __name__ == "__main__":
    main()

    # app = Flask(__name__)
    # app.register_blueprint(api, url_prefix='/api')
    # app.run(debug=True)