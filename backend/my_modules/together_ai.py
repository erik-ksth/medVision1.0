from my_modules.vision_script import *
import together
import sys
# from flask import Flask, request, jsonify

# app = Flask(__name__)

# @app.route('/api/process-together-ai', methods=['POST'])
def process_text_with_together_ai():
    together.api_key = "8947d2a3734e748f8c299b26b9800857d9a119ebdad819e72af51af641d5fffa"

    output = together.Complete.create (
    prompt = detect_text() + " Give me only useful information such as usage, dosage and storage. ",
    # prompt = detect_text() + " please classify whether it is medicine related text, if yes, ONLY answer with 'YES' if not, ONLY answer with 'NO'",
    model = "upstage/SOLAR-0-70b-16bit", 
    max_tokens = 200,
    temperature = 0.6,
    top_k = 50,
    top_p = 0.7,
    repetition_penalty = 1,
    )

    generated_text = output['output']['choices'][0]['text']
    print(generated_text)
    
    # if("NO" in generated_text):
    #     print("Please capture an image again.")
    #     sys.exit(1)
        
    # print("---------------------------------------------------------")
    # print(generated_text)
    # print("---------------------------------------------------------")

    # results = {"together_ai_output": generated_text}
    # return jsonify(results)
    return generated_text
