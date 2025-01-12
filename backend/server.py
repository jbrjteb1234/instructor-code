from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

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
        systemPrompt = "Provide assistance to the user. The user is a beginner learning python, answer their promopt in a pedagogical and instructive manner, teachning not doing. Provide limited python code to assist with this. Only address glaring blatant issues with the code, don't suggest potential improvements. Only produce an answer which directly addresses the user's prompt and code, no introductions or anything of the sort. Address a maximum of TWO issues in the code"

        return complete(userPrompt, systemPrompt)

@app.route('/query-error', methods=['POST'])
def error():

        payload = request.json
        error = payload.get('prompt','')
        code = payload.get('code','')

        userPrompt = f"User's error after running: {error}\nUser's code: {code}"
        systemPrompt = "Provide assistance to the user. The user is a beginner learning python and has encountered an error. In a pedagogical and instructive manner, provide limited python code to assist with this. Only address glaring blatant issues with the code, don't suggest potential improvements. Only produce an answer which directly addresses the user's error and code, no introductions or anything of the sort. Address ONLY the issue with the code which is causing the error"

        return complete(userPrompt, systemPrompt)

if __name__ == "__main__":
    app.run(debug=True)