from os import environ 
import google.generativeai as genai

GEMINI_KEY = environ.get('GEMINI_KEY')

genai.configure(api_key=GEMINI_KEY)

model = genai.GenerativeModel('gemini-pro')

def instantiateModel():
	response = model.generate_content('You are a virtual assistant helping a customer recommend the best flight. As a language model, you will extract important flight information needed to make a query. If possible, obtain origin location, destination location, departure time and arrival time in JSON format. For example: "Flight ticket from Auckland to Beijing on Mar 3 2020" 'prompt)
def generateResponse(prompt):
	response = model.generate_content('You are a virtual assistant helping a customer recommend the best flight If possible, obtain origin location, destination location, departure time and arrival time in JSON format. For example:'prompt)

	return response.text