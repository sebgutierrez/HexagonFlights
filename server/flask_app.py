

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from amadeus.api_call import Api_call
import json
from api.flights import dataframebuilder
from openai.chatbot import generateResponse,welcome_message

app = Flask(__name__)

CORS(app)

with open('api/countries.json', 'r') as json_file:
    data = json.load(json_file)

# @app.route('/', methods= ['GET','POST'])
# def welcome():
#     return "Hello"

@app.route("/home", methods = ['GET','POST'])
def ai_welcome():
    print("Ai welcome is starting")
    message = welcome_message()

    return message.text


@app.route('/generate-response', methods=['POST'])
def generate():
    print("Received response body:", request.json.get('prompt'))
    prompt = request.json.get('prompt')
    if prompt:
       response = generateResponse(prompt)
       
       return jsonify({'response': response})
    else:
        return jsonify({'error': 'No response body provided'}), 400


@app.route('/getCountryCodes', methods=['GET', 'POST'])
def getCountryCodes():
    search_term = request.form.get('search_term', '')

    # Filter the data based on the search term
    filtered_data = [entry for entry in data if search_term.lower() in entry['country_name'].lower()]

    return render_template('CountryCodes.html', data=filtered_data, search_term=search_term)

@app.route('/flight_searcher',methods = ['GET'])
def flight_searcher():
    date = request.args.get('date')
    Api_call().flight_offers(departure_date=f"{date}",access_token=Api_call().get_access_token())
    return 'Got flights now'

@app.route('/cheapestroute', methods = ['GET'])
def cheap_route():
    from_dest = request.form['From']
    to_destination = request.form['To']
    departure = request.form['Departure']
    arrival = request.form['Return']

    df =dataframebuilder().cheapest_flight(departure_date=departure,originLocationCode=from_dest,destinationLocationCode=to_destination)
    print(f"These are my cheapest flights with a price of {df.iloc[0, df.columns.get_loc('price.grandTotal')]}")
    return f"These are my cheapest flights with a price of {df.iloc[0, df.columns.get_loc('price.grandTotal')]}"


if __name__ == '__main__':
    app.run(debug=False)