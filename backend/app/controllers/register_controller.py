from flask_login import login_user
from flask_login import logout_user
from app.models.user import User

class RegisterController:
    @staticmethod
    def handle_login(username, password):
        user = User.query.filter_by(username=username).first()

        if not user or not user.check_password(password):
            return {"error": "Invalid username or password"}, 401

        login_user(user)
        return {"message": "Login successful"}, 200
    
    def handle_logout():
        try:
            logout_user()
            return {"message": "Logout successful"}, 200
        except Exception as e:
            return {"error": str(e)}