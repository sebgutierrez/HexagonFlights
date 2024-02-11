import pandas
import pandas as pd
from pandas import DataFrame
from amadeus.api_call import Api_call

class dataframebuilder:
    def flights(self):
        try:
            flight_offers = Api_call().flight_offers(access_token=Api_call().get_access_token(),departure_date="2024-03-03")
            flight_offers = flight_offers['data']
            flight_df = pd.json_normalize(data=flight_offers)
            flight_df = flight_df.drop(columns=['itineraries','travelerPricings','price.fees'],axis=1)
            return flight_df

        except Exception as e:
            print(e)
            return "Error in creating flight dataframe"
    def cheapest_flight(self,departure_date:str,originLocationCode:str,destinationLocationCode:str):
        try:
            flight_offers = Api_call().flight_offers(access_token=Api_call().get_access_token(),departure_date=departure_date, originLocationCode=originLocationCode,destinationLocationCode=destinationLocationCode)
            flight_offers = flight_offers['data']
            flight_df = pd.json_normalize(data=flight_offers)
            flight_df = flight_df.drop(columns=['itineraries','travelerPricings','price.fees'],axis=1)
            df = flight_df.loc[:,['price.grandTotal']]
            flight_df['price.grandTotal'] = pd.to_numeric(df['price.grandTotal'])
            min_value = flight_df['price.grandTotal'].min()

            min_indices = flight_df.index[flight_df['price.grandTotal'] == min_value].tolist()

            # Get rows with the minimum value
            min_rows = flight_df.loc[min_indices]

            # Print the rows with minimum values
            print("Rows with minimum value:")
            print(min_rows.to_string())

            # Print the minimum value
            print(f"This is my min value: {min_value}")
            return min_rows
        except Exception as e:
            print(e)
            return False