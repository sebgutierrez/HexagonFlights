import json

with open('airports.json', 'r') as file:
    airport_data = json.load(file)

airport_names = [airport['name'] for airport in airport_data]
airport_codes = [airport['code'] for airport in airport_data]


# Define function to classify text
def classify_text(text):
    # Feature engineering based on airport data
    contains_airport_name = any(name.lower() in text.lower() for name in airport_names)
    contains_airport_code = any(code.lower() in text.lower() for code in airport_codes)

    # Example classification logic
    if contains_airport_name or contains_airport_code:
        return "Airport"
    else:
        return "Other"


text1 = "I'm flying from JFK to LAX"
text2 = "I live in New York"
print(classify_text(text1))  # Output: Airport
print(classify_text(text2))
