from flask import Response, current_app, request, jsonify
from flask_login import login_required
from app.controllers.register_controller import RegisterController
from . import api_v1

# Endpoint for user registration
@api_v1.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' 
        } 
        return jsonify(headers), 200
    
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Invalid username or password"}), 401
    
    result = RegisterController.handle_login(username, password)

    if 'error' in result:
        return jsonify(result), 500

    return jsonify(result), 200

@api_v1.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' 
        } 
        return jsonify(headers), 200
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Invalid data"}), 401

    result = RegisterController.handle_signup(username, email, password)

    if 'error' in result:
        return jsonify(result), 500

    return jsonify(result)

@api_v1.route('/logout', methods=['POST', 'OPTIONS'])
# @login_required
def logout():
    result = RegisterController.handle_logout()
    if 'error' in result:
        return jsonify(result), 500
    
    return jsonify({"message": "Logout successful"})