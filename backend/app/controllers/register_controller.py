from flask_login import login_user, user_loaded_from_cookie
from flask_login import logout_user
from werkzeug.security import generate_password_hash
from app.models.user import User
from app.db.db import db

class RegisterController:
    @staticmethod
    def handle_login(username, password):
        user = User.query.filter_by(username=username).first()

        if not user or not user.check_password(password):
            return {"error": "Invalid username or password"}

        result = login_user(user)
        if result:
            return {"message": "Login successful"}
        else:
            return {"error": "Sorry, the user could not be logged in. Try again later."}
    
    def handle_signup(username, email, password):
        # Check if the username already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return {"error": "Invalid username or password"}

        # Hash the password before storing it
        password_hash = generate_password_hash(password)

        # Create a new user
        new_user = User(username=username, email=email, password_hash=password_hash)

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User created successfully'}
    
    def handle_logout():
        try:
            logout_user()
            return {"message": "Logout successful"}
        except Exception as e:
            return {"error": str(e)}