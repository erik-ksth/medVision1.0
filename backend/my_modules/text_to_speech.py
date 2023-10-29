import google.cloud.texttospeech as tts
# from playsound import playsound 
import os
from flask import Flask, jsonify, send_file

app = Flask(__name__)

# Generate audio file from text using Google Text-to-Speech AI
def text_to_wav(voice_name: str, text: str):
    language_code = "-".join(voice_name.split("-")[:2])
    text_input = tts.SynthesisInput(text=text)
    voice_params = tts.VoiceSelectionParams(
        language_code=language_code, name=voice_name
    )
    audio_config = tts.AudioConfig(audio_encoding=tts.AudioEncoding.LINEAR16)

    client = tts.TextToSpeechClient()
    response = client.synthesize_speech(
        input=text_input,
        voice=voice_params,
        audio_config=audio_config,
    )

    filename = f"{voice_name}.wav"
    with open(filename, "wb") as out:
        out.write(response.audio_content)


# Send the audio file to Front End
@app.route('/api/get-speech/<voice_name>', methods=['GET'])
def get_speech(voice_name):
        filename = f"{voice_name}.wav"
    
        if os.path.exists(filename):
            print(f'Generated speech saved to "{filename}"')
            return send_file(filename, as_attachment=True)
        else:
            return jsonify({"error": "Audio file not found."})
