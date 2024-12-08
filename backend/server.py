from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch

app = Flask(__name__)
CORS(app)

@app.route('/translate', methods=['POST'])
def translate(): 

        response = "Server reached"

        return {"response": response}

if __name__ == "__main__":
    app.run(debug=True)