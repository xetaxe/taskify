from flask import Flask

def create_app():
    app = Flask(__name__)

    # Add configuration or extensions here if needed

    # Import and register blueprints (if using modular structure)
    from .routes import main_bp
    app.register_blueprint(main_bp)

    return app
