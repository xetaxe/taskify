# Example: tasks.py
from . import api_bp_v1

@api_bp_v1.route("/tasks")
def get_tasks():
    # Logic to fetch tasks
    return 'Hello'
