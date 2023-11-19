from flask import request, jsonify
from flask_login import login_required
from app.controllers.register_controller import RegisterController
from . import api_v1

# Endpoint for user registration
@api_v1.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Invalid username or password"}), 401
    
    result = RegisterController.handle_login(username, password)

    if 'error' in result:
        return jsonify(result), 500

    return jsonify(result),

@api_v1.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Invalid username or password"}), 401

    result = RegisterController.handle_signup(username, password)

    if 'error' in result:
        return jsonify(result), 500

    return jsonify(result)

@api_v1.route('/logout')
@login_required
def logout():
    result = RegisterController.handle_logout()
    if 'error' in result:
        return jsonify(result), 500
    
    return jsonify({"message": "Logout successful"})