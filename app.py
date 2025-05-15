from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend requests

# MySQL configuration
db_config = {
    'host': '127.0.0.1',
    'user': 'root',  # Replace with your MySQL username
    'password': 'rootpassword',  # Replace with your MySQL password
    'database': 'registration_db'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Extract form data
        full_name = data.get('name')
        email = data.get('email')
        password = data.get('password')  # In production, hash this password
        registration_date = data.get('date')
        gender = data.get('gender')
        street_address1 = data['address'].get('street1')
        street_address2 = data['address'].get('street2')
        country = data['address'].get('country')
        city = data['address'].get('city')
        region = data['address'].get('region')
        postal_code = data['address'].get('postalCode')

        # Basic validation
        if not all([full_name, email, password, registration_date, gender, street_address1, country, city, region, postal_code]):
            return jsonify({'message': 'All required fields must be filled'}), 400

        # Connect to database
        connection = get_db_connection()
        if not connection:
            return jsonify({'message': 'Database connection failed'}), 500

        cursor = connection.cursor()

        # Insert data into database
        query = """
        INSERT INTO users (full_name, email, password, registration_date, gender, street_address1, street_address2, country, city, region, postal_code)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (full_name, email, password, registration_date, gender, street_address1, street_address2, country, city, region, postal_code)

        try:
            cursor.execute(query, values)
            connection.commit()
            return jsonify({'message': 'Registration successful'}), 200
        except Error as e:
            if 'Duplicate entry' in str(e):
                return jsonify({'message': 'Email already registered'}), 400
            return jsonify({'message': f'Database error: {str(e)}'}), 500
        finally:
            cursor.close()
            connection.close()

    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)