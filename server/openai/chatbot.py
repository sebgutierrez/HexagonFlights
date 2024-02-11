from os import environ 
import google.generativeai as genai

GEMINI_KEY = environ.get('GEMINI_KEY')

genai.configure(api_key=GEMINI_KEY)

model = genai.GenerativeModel('gemini-pro')

def generateResponse(prompt):
	response = model.generate_content(prompt)
	return response.text