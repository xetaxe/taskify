# db/seed.py
from app.models.task import Task
from app.models.user import User
from .db import db

def seed_database():
    with db.session.begin_nested():
        sample_tasks = [
            Task(title='Find the missing sock', description='The quest for the legendary missing sock begins!', author_id='1'),
            Task(title='Teach cat to code', description="Teaching coding to a furry friend, the ultimate challenge.", author_id='2'),
            Task(title='Fix printer, blame it on ghosts', description='The printer is possessed, needs exorcism.', author_id='3'),
            Task(title='Convince AI it is not taking over the world', description="AI's existential crisis intervention.", author_id='2'),
            Task(title='Attend ninja training', description='Learning stealthy techniques without being seen.', author_id='1')
        ]

        for task in sample_tasks:
            db.session.add(task)

        sample_users = [
            User(username='laundry_detective', email='laundry.detective@email.com', password_hash='12345'),
            User(username='CatWhisperer88', email='ilovemycat@hotmail.com', password_hash='abcde'),
            User(username='TomaToO', email='tomatotomato@gmail.com', password_hash='09876')
        ]

        for user in sample_users:
            db.session.add(user)

        db.session.commit()
