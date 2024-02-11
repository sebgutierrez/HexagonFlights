from os import environ 
import google.generativeai as genai
<<<<<<< HEAD
from flask import jsonify
=======
import json

>>>>>>> 73fe8d990e6f3fa0ae7d6b07d77a52e2b4d6a0f7

GEMINI_KEY = environ.get('GEMINI_KEY')

genai.configure(api_key=GEMINI_KEY)

model = genai.GenerativeModel('gemini-pro')


<<<<<<< HEAD
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

=======


str = '"currencyCode": "USD", "originDestinations": [{"id": "1","originLocationCode": originLocationCode,"destinationLocationCode": destinationLocationCode,"departureDateTimeRange": {"date": departure_date,"time": "10:00:00"}}],"travelers": [{"id": "1","travelerType": "ADULT"}],"sources": ["GDS"],"searchCriteria": {"maxFlightOffers": 100,"flightFilters": {"cabinRestrictions": [{"cabin": "BUSINESS","coverage": "MOST_SEGMENTS","originDestinationIds": ["1"]}'
def instantiateModel():
	return True


def generateResponse(prompt, inferred_origin="user's location"):
    detailed_prompt = (
        "Given a user's request for travel, generate a structured JSON response "
        "with the necessary details for a flight search, including origin location code, "
        "destination location code, and departure date. Use any available information "
        "from the request and fill in gaps with inferred or default values. "
        f"For example, if a user says: '{prompt}', and the inferred origin is '{inferred_origin}', "
        "format the response accordingly. "
        "The JSON format your outputting should have this format: " + str  # Assuming 'str' is a string variable holding JSON structure example
    )
    try:
        response = model.generate_content(
			prompt,
			max_length=100,
			temperature=0.7,
			top_p=1.0,
			frequency_penalty=0.0,
			presence_penalty=0.0
		)
        print(response.text)
        return response.text
    
    except Exception as e:
        print(f"Error generating response: {e}")
        return None
    originLocationCode = ai_response_data.get('originLocationCode')
    destinationLocationCode = ai_response_data.get('destinationLocationCode')
    departure_date = ai_response_data.get('departure_date')	
    api_caller = Api_call()
    access_token = api_caller.get_access_token()
    flight_offers_response = api_caller.flight_offers(departure_date, access_token, originLocationCode, destinationLocationCode)
>>>>>>> 73fe8d990e6f3fa0ae7d6b07d77a52e2b4d6a0f7
