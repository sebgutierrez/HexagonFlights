from os import environ 
import google.generativeai as genai

from flask import jsonify

GEMINI_KEY = environ.get('GEMINI_KEY')

genai.configure(api_key=GEMINI_KEY)

model = genai.GenerativeModel('gemini-pro')


def welcome():
	response = model.generate_content('You are a virtual assistant named hexagon for someone trying to get a flight. Send them a warm welcome message that is 3 sentences max.')
	print(response)
	return response




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
        "The JSON format your outputting should have this format: " + str  
    )
    try:
        response = model.generate_content(detailed_prompt)
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

