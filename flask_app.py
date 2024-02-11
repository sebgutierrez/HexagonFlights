import pandas
import requests
from flask import Flask, jsonify, request, render_template
from amadeus.api_call import Api_call
import json
from data_manipulation.flights import dataframebuilder

app = Flask(__name__)


with open('countries.json', 'r') as json_file:
    data = json.load(json_file)


@app.route('/Home', methods= ['GET','POST'])
def welcome():
    return render_template('home.html')
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
    df =dataframebuilder().cheapest_flight()
    print(f"These are my cheapest flights with a price of {df.iloc[0, df.columns.get_loc('price.grandTotal')]}")
    return f"These are my cheapest flights with a price of {df.iloc[0, df.columns.get_loc('price.grandTotal')]}"


if __name__ == '__main__':
    app.run(debug=False)