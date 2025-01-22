from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
from datetime import date
import logging

app = Flask(__name__)
CORS(app)
app.logger.setLevel(logging.INFO) 

load_dotenv()
client = OpenAI()

def complete(userPrompt, systemPrompt):
    completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": systemPrompt},
            {"role": "user", "content": userPrompt}
        ],
        model="gpt-4o-mini", 
        max_tokens=1024,
        temperature=0.7
    )

    output = completion.choices[0].message.content

    return output

@app.route('/prompt-assistance', methods=['POST'])
def prompt():

    payload = request.json
    inputPrompt = payload.get('prompt','')
    code = payload.get('code','')

    userPrompt = f"User's question: {inputPrompt}\nUser's code: {code}"
    systemPrompt = "Provide assistance to the user, who is a complete beginner. Produce NO python code, use PURE english to assist them but never typing out the correct code. In ONE paragraph Address a maximum of TWO issues."

    return complete(userPrompt, systemPrompt), 200

@app.route('/query-error', methods=['POST'])
def error():

    payload = request.json
    error = payload.get('prompt','')
    code = payload.get('code','')

    userPrompt = f"User's error after running: {error}\nUser's code: {code}"
    systemPrompt = "Provide assistance to the user, who is a complete beginner and just encountered an error after executing their python code. Produce NO python code, use PURE english to assist them but never typing out the correct code. In ONE paragraph Address a maximum of TWO issues."

    return complete(userPrompt, systemPrompt), 200

@app.route('/status', methods=['GET'])
def status():
    exam = os.getenv('EXAM') == '1'

    return jsonify({
        "status": "ok",
        "examLoaded": exam
    }), 200

@app.route('/begin-exam', methods=['GET'])
def beginExam():
    
    try:
        examTime = int(os.getenv('EXAM_TIME', '30'))*60
    except ValueError:
        app.logger.error("Invalid exam time, must be integer. Defaulting to 30 minutes")
        examTime = 30*60

    try:
        with open('exam.txt', 'r') as file:
            exam = file.read()
            app.logger.info("Successfully read exam file")
    except FileNotFoundError:
        return jsonify({"error": "File not found"}),404
    except Exception as e:
        return jsonify({"error": f"An unexpected error has occured: {str(e)}"}),500

    return jsonify({
        "examTime": examTime,
        "exam": exam
    }), 200

@app.route('/submit-exam', methods=['PUT'])
def submitExam():
    payload = request.json
    submission = payload.get('submission','')

    try:
        with open('submissions.txt', 'a') as file:
            file.write(f"\n\nSubmission {date.today().day}/{date.today().month}/{date.today().year}:\n{submission}")
            app.logger.info("Successfully recorded submission")
    except Exception as e:
        app.logger.info("Error recording submission - ensure submissions.txt is in root directory")

    return '',204

if __name__ == "__main__":
    app.run(debug=False)