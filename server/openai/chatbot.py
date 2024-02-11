# from os import environ 
# import google.generativeai as genai

# GEMINI_KEY = environ.get('GEMINI_KEY')

# genai.configure(api_key=GEMINI_KEY)

# model = genai.GenerativeModel('gemini-pro')

# def generateResponse(prompt):
# 	response = model.generate_content(prompt)
# 	return response.text

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

GEMINI_KEY = os.environ.get('AIzaSyDkzYeGUWzGh-Jc_PFT7DU2y3nuMxE2KbI')
genai.configure(api_key=GEMINI_KEY)
model = genai.GenerativeModel('gemini-pro')

@app.route('/generate-response', methods=['POST'])
def generate_response():
    data = request.json
    prompt = data.get('prompt')
    response = model.generate_content(prompt)
    return jsonify({'response': response.text})

if __name__ == '__main__':
    app.run(debug=True)
