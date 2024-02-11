
import json
import datetime
from datetime import date
import requests
import os
from dotenv import load_dotenv
load_dotenv()

class Api_call:
  def get_access_token(self):
    try:
      url = "https://test.api.amadeus.com/v1/security/oauth2/token"

      payload = f"grant_type=client_credentials&client_id={os.getenv('CLIENT_ID')}&client_secret={os.getenv('SECRET')}"
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

      response = requests.request("POST", url, headers=headers, data=payload).json()
      return response["access_token"]
    except Exception as e:
      print(f" There is an error in getting access token {e}")
      return False

  def flight_offers(self,departure_date:str,access_token:str,originLocationCode:str,destinationLocationCode:str):
    """ Date format has to be in 2023-11-01"""
    try:
      url = "https://test.api.amadeus.com/v2/shopping/flight-offers"

      payload = json.dumps({
        "currencyCode": "USD",
        "originDestinations": [
          {
            "id": "1",
            "originLocationCode": originLocationCode,
            "destinationLocationCode": destinationLocationCode,
            "departureDateTimeRange": {
              "date": departure_date,
              "time": "10:00:00"
            }
          }
        ],
        "travelers": [
          {
            "id": "1",
            "travelerType": "ADULT"
          }
        ],
        "sources": [
          "GDS"
        ],
        "searchCriteria": {
          "maxFlightOffers": 100,
          "flightFilters": {
            "cabinRestrictions": [
              {
                "cabin": "BUSINESS",
                "coverage": "MOST_SEGMENTS",
                "originDestinationIds": [
                  "1"
                ]
              }
            ]
          }
        }
      })
      headers = {
        'Content-Type': 'application/json',
        'Authorization': f"Bearer {access_token}"
      }

      response = requests.request("POST", url, headers=headers, data=payload).json()

      return response
    except Exception as e:
      print(e)
      return e