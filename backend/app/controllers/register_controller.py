from flask_login import login_user
from flask_login import logout_user
from werkzeug.security import generate_password_hash
from app.models.user import User
from app.db.db import db

class RegisterController:
    @staticmethod
    def handle_login(username, password):
        user = User.query.filter_by(username=username).first()

        if not user or not user.check_password(password):
            return {"error": "Invalid username or password"}, 401

        login_user(user)
        return {"message": "Login successful"}, 200
    
    def handle_signup(username, password):
        # Check if the username already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return {"error": "Invalid username or password"}, 400

        # Hash the password before storing it
        hashed_password = generate_password_hash(password)

        # Create a new user
        new_user = User(username=username, password=hashed_password)

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User created successfully'}, 201
    
    def handle_logout():
        try:
            logout_user()
            return {"message": "Logout successful"}, 200
        except Exception as e:
            return {"error": str(e)}