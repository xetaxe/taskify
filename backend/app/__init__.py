from flask import Flask
from sqlalchemy import inspect
from flask_login import LoginManager
from flask_cors import CORS, cross_origin
from .db.db import db
from .db.seed import seed_database 
from .models.task import Task
from .models.user import User
from .routes.v1 import api_v1

def create_app():
    app = Flask(__name__)
    cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173", "supports_credentials": True}})

    app.secret_key = 'my_secret_key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_COOKIE_HTTPONLY'] = False
    # app.config['SESSION_COOKIE_DOMAIN'] = 'localhost'
    # app.config['SESSION_COOKIE_PATH'] = '/'
    print(app.config)

    # Configuration for SQLite database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        # Delete any previous DB Task and User tables, if they exist
        try:
            inspector = inspect(db.engine)
            if inspector.has_table(Task.__tablename__):
                db.session.query(Task).delete()
                db.session.commit()
            if inspector.has_table(User.__tablename__):
                db.session.query(User).delete()
                db.session.commit()

        except Exception as e:
            db.session.rollback()
        
        # Create database tables
        db.create_all()

        # Seed the database
        seed_database()


    login_manager = LoginManager(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))


    app.register_blueprint(api_v1)

    return app