from flask import Flask
from .routes.v1 import api_bp_v1

def create_app():
    app = Flask(__name__)

    app.register_blueprint(api_bp_v1)

    return app