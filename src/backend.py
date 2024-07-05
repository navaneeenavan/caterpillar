from flask import Flask, jsonify, request
import google.generativeai as genai
import re
import json
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Configure Gemini API
genai.configure(api_key="AIzaSyDXvkJJYAbSDag8EnppGOpzpWmQ8aPUYnY")

# MongoDB connection URI
mongo_uri = "mongodb+srv://admin:admin@cluster0.9fknthw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Connect to MongoDB server
client = MongoClient(mongo_uri)

# Select the database
db = client['inspectionsDB']  # Replace with your database name

# Select the collection
collection = db['inspections']  # Replace with your collection name

@app.route('/inspections', methods=['GET'])
def get_inspections():
    """
    Fetch all inspection records from the database.
    
    :return: JSON list of all inspection records.
    """
    inspections = collection.find()
    results = []
    for inspection in inspections:
        # Convert MongoDB ObjectId to string for JSON serialization
        inspection['_id'] = str(inspection['_id'])
        results.append(inspection)
    return jsonify(results)

# Helper function to update a specific section
def update_section(truck_serial_number, section_name, section_data):
    """
    Update a specific section for a truck based on its serial number.
    
    :param truck_serial_number: The serial number of the truck.
    :param section_name: The name of the section to update.
    :param section_data: The data to update in the section.
    :return: JSON response with the status of the update.
    """
    # Find the truck inspection record by serial number
    inspection = collection.find_one({"truck_serial_number": truck_serial_number})
    
    if not inspection:
        return jsonify({"error": f"Truck with serial number {truck_serial_number} not found"}), 404
    
    # Prepare the update query
    update_query = {}
    for key, value in section_data.items():
        if key in inspection[section_name]:
            update_query[f'{section_name}.{key}'] = value
    
    # Perform the update
    if update_query:
        result = collection.update_one(
            {"truck_serial_number": truck_serial_number},
            {"$set": update_query}
        )
        
        if result.modified_count > 0:
            return jsonify({"message": f"{section_name.capitalize()} updated successfully"})
        else:
            return jsonify({"message": f"No changes made to the {section_name} data"})
    
    return jsonify({"error": f"No valid {section_name} data provided"}), 400

# Route to update tires
@app.route('/api/truck-inspections/update-tires/<truck_serial_number>', methods=['POST'])
def update_tires(truck_serial_number):
    """
    Update the tires information for a specific truck.
    
    :param truck_serial_number: The serial number of the truck.
    :return: JSON response with the status of the update.
    """
    data = request.json
    tires_data = data.get('tires', {})
    return update_section(truck_serial_number, 'tires', tires_data)

# Route to update battery
@app.route('/api/truck-inspections/update-battery/<truck_serial_number>', methods=['POST'])
def update_battery(truck_serial_number):
    """
    Update the battery information for a specific truck.
    
    :param truck_serial_number: The serial number of the truck.
    :return: JSON response with the status of the update.
    """
    data = request.json
    battery_data = data.get('battery', {})
    return update_section(truck_serial_number, 'battery', battery_data)

# Route to update engine
@app.route('/api/truck-inspections/update-engine/<truck_serial_number>', methods=['POST'])
def update_engine(truck_serial_number):
    """
    Update the engine information for a specific truck.
    
    :param truck_serial_number: The serial number of the truck.
    :return: JSON response with the status of the update.
    """
    data = request.json
    engine_data = data.get('engine', {})
    return update_section(truck_serial_number, 'engine', engine_data)

# Route to update brakes and exterior
@app.route('/api/truck-inspections/update-brakes-and-exterior/<truck_serial_number>', methods=['POST'])
def update_brakes_and_exterior(truck_serial_number):
    """
    Update the brakes and exterior information for a specific truck.
    
    :param truck_serial_number: The serial number of the truck.
    :return: JSON response with the status of the update.
    """
    data = request.json
    brakes_and_exterior_data = data.get('brakes_and_exterior', {})
    return update_section(truck_serial_number, 'brakes_and_exterior', brakes_and_exterior_data)

def generate_battery_info(text):
    """
    Generate battery information from text using Gemini API.
    
    :param text: The input text describing the battery details.
    :return: Parsed JSON object with battery details.
    """
    try:
        prompt = f"""
        You are an expert in interpreting technical details from textual descriptions.
        Given the following text, extract the information related to battery details and fill out the corresponding fields.
        If any information is not available in the text, leave it empty. Here are the fields you need to fill:
        - Battery make
        - Battery replacement date
        - Battery voltage
        - Battery water level (Good, Ok, Low)
        - Condition of battery (Yes/No)
        - Any Leak (Yes/No)
        - Any Rust (Yes/No)

        Text: {text}
        for date add in this format yyyy-MM-dd
        Provide the output as a JSON object with the following format:
        {{
            "truck_serial_number" : " ",
            "battery_make": "",
            "battery_replacement_date": "",
            "battery_voltage": "",
            "battery_water_level": "",
            "condition_of_battery": "",
            "any_leak": "",
            "any_rust": "",
            "overall_summary": "",
        }}
        Only provide the JSON object for easier parsing and formatting, without any additional formatting or markdown.
        """

        model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")
        response = model.generate_content([prompt])

        if response.candidates:
            response_text = response.candidates[0].content.parts[0].text.strip()
            print(f"Response from Gemini API: {response_text}")
            
            if not response_text:
                return {'error': 'Empty response from API'}
            
            data = split_and_load_ejson(response_text)
            
            if data is None:
                print("Attempting to parse response as plain JSON.")
                data = clean_response(response_text)
            
            if data is None:
                return {'error': 'Failed to extract JSON from API response'}
            
            return data
        else:
            return {'error': 'No candidates in API response'}
    
    except Exception as e:
        print(f"Error during API call or processing: {str(e)}")
        return {'error': str(e)}

def split_and_load_ejson(text):
    """
    Extract JSON content from a text block containing JSON within triple backticks.
    
    :param text: The input text containing JSON content.
    :return: Parsed JSON object or None if extraction fails.
    """
    pattern = r"json(.*?)"
    match = re.search(pattern, text, re.DOTALL)
    
    if match:
        json_content = match.group(1).strip()
        try:
            data = json.loads(json_content)
            return data
        except json.JSONDecodeError as e:
            print(f"Error: Invalid JSON format in extracted content: {str(e)}")
            return None
    else:
        print("Error: No valid JSON block found using triple backticks")
        return None

def clean_response(response_text):
    """
    Extract a valid JSON object from the response text.
    
    :param response_text: The raw text response from the API.
    :return: Parsed JSON object or None if extraction fails.
    """
    try:
        json_data = json.loads(response_text)
        return json_data
    except json.JSONDecodeError:
        pass

    json_pattern = re.compile(r'({.*})', re.DOTALL)
    match = json_pattern.search(response_text)
    if match:
        json_content = match.group(1)
        try:
            json_data = json.loads(json_content)
            return json_data
        except json.JSONDecodeError as e:
            print(f"Error: Invalid JSON format in cleaned content: {str(e)}")
            return None
    
    print("Error: No valid JSON object found in response")
    return None

# Route to generate battery information from text
@app.route('/generate_battery_info', methods=['POST'])
def generate_battery_info_route():
    """
    Extract battery information from a given text using the Gemini API.
    
    :return: JSON object containing extracted battery information.
    """
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'error': 'Text is required'}), 400

    battery_info = generate_battery_info(text)
    
    if battery_info is None or 'error' in battery_info:
        return jsonify(battery_info), 500

    return jsonify({'battery_info': battery_info}), 200

if __name__ == '__main__':
    app.run(debug=True)