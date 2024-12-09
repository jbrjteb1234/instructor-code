from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import T5ForConditionalGeneration, RobertaTokenizer
import torch

app = Flask(__name__)
CORS(app)

# Load CodeT5 model and tokenizer
print("Loading CodeT5 model...")
model_name = "Salesforce/codet5-small"
tokenizer = RobertaTokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)
print("CodeT5 model loaded successfully.")

@app.route('/prompt-assistance', methods=['POST'])
def prompt():

        data = request.json

        response = "Server reached"

        return {"response": response}

@app.route('/query-error', methods=['POST'])
def error():

        data = request.json

        response = "Server reached"

        return {"response": response}

if __name__ == "__main__":
    app.run(debug=True)