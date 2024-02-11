from os import environ 
import google.generativeai as genai
from flask import jsonify

GEMINI_KEY = environ.get('GEMINI_KEY')

genai.configure(api_key=GEMINI_KEY)

model = genai.GenerativeModel('gemini-pro')


def welcome_message():
	response = model.generate_content('You are a virtual assistant named hexagon for someone trying to get a flight. Send them a warm welcome message that is 3 sentences max.')
	print(response)
	return response

def instantiateModel():
	return True
	#response = model.generate_content('You are a virtual assistant helping a customer recommend the best flight. As a language model, you will extract important flight information needed to make a query. If possible, obtain origin location, destination location, departure time and arrival time in JSON format. For example: "Flight ticket from Auckland to Beijing on Mar 3 2020" 'prompt)
def generateResponse(prompt):
	#response = model.generate_content('You are a virtual assistant helping a customer recommend the best flight If possible, obtain origin location, destination location, departure time and arrival time in JSON format. For example:'prompt)
	#return response.text
	return True

