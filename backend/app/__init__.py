from flask import Flask
from sqlalchemy import inspect
from app.db.db import db
from .routes.v1 import api_v1
from .models.task import Task

def create_app():
    app = Flask(__name__)

    # Configuration for SQLite database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        # Delete any previous information
        try:
            inspector = inspect(db.engine)
            if inspector.has_table(Task.__tablename__):
                db.session.query(Task).delete()
                db.session.commit()

        except Exception as e:
            db.session.rollback()
        
        # Create database tables
        db.create_all()

        # Seed the database
        sample_tasks = [
            Task(title='Fix printer, blame it on ghosts', description='The printer is possessed, needs exorcism.', author='Ghostbusters'),
            Task(title='Find the missing sock', description='The quest for the legendary missing sock begins!', author='Laundry Detective'),
            Task(title='Teach cat to code', description="Teaching coding to a furry friend, the ultimate challenge.", author='Cat Whisperer'),
            Task(title='Convince AI it is not taking over the world', description="AI's existential crisis intervention.", author='AI Therapist'),
            Task(title='Attend ninja training', description='Learning stealthy techniques without being seen.', author='Stealth Sensei')
        ]

        for task in sample_tasks:
            db.session.add(task)

        # Commit the changes
        db.session.commit()


    app.register_blueprint(api_v1)

    return app