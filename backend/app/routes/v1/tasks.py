from flask import request, jsonify
from flask_login import current_user, login_required
from app.controllers.task_controller import TaskController
from . import api_v1

# Route for handling GET requests
@api_v1.route('/tasks', methods=['GET'])
def get_all_tasks():
    tasks = TaskController.get_tasks()

    if isinstance(tasks, list):
        return jsonify({"tasks": tasks}), 200
    else:
        return jsonify({"error": tasks}), 500


# Route for handling POST requests
@api_v1.route('/tasks', methods=['POST'])
@login_required
def create_task():
    # Handle POST request
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')

    if not title:
        return jsonify({"error": "Title and author are required"}), 400
    
    if current_user.is_authenticated:
        author_id = current_user.id
    else:
        return jsonify({"error": "User not authenticated"}), 401

    result = TaskController.create_task(title, description, author_id)

    if 'error' in result:
        return jsonify(result), 500

    return jsonify(result), 201


# Route for handling GET requests for a specific task
@api_v1.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = TaskController.get_task(task_id)
    print(task)
    if task:
        return jsonify({"task": {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "author": task.author.username,
            "created_at": task.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }})
    return jsonify({"message": "Task not found"}), 404


# Route for handling PUT requests for a specific task
@api_v1.route('/tasks/<int:task_id>', methods=['PUT'])
@login_required
def update_task(task_id):
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')

    if not any([title, description]):
        return jsonify({"error": "Provide at least one field to update"}), 400

    if current_user.is_authenticated:
        author_id = current_user.id
    else:
        return jsonify({"error": "User not authenticated"}), 401

    result = TaskController.update_task(task_id, title, description, author_id)

    if 'error' in result:
        return jsonify(result), 404
    else:
        return jsonify(result), 200


# Route for handling DELETE requests for a specific task
@api_v1.route('/tasks/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
    result = TaskController.delete_task(task_id)

    if 'error' in result:
        return jsonify(result), 404  # Task not found or other errors
    else:
        return jsonify(result), 200  # Task deleted successfully