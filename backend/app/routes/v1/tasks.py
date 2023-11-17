from flask import request, jsonify
from app.controllers.task_controller import TaskController
from . import api_v1

# Route for handling GET and POST requests
@api_v1.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        tasks = TaskController.get_tasks()

        if isinstance(tasks, list):
            return jsonify({"tasks": tasks}), 200
        else:
            return jsonify({"error": tasks}), 500

    elif request.method == 'POST':
        # Handle POST request
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        author = data.get('author')

        if not title or not author:
            return jsonify({"error": "Title and author are required"}), 400

        result = TaskController.create_task(title, description, author)

        if 'error' in result:
            return jsonify(result), 500

        return jsonify(result),


# Route for handling GET, PUT and DELETE requests for a specific task
@api_v1.route('/tasks/<int:task_id>', methods=['GET', 'PUT', 'DELETE'])
def single_task(task_id):
    if request.method == 'GET':
        task = TaskController.get_task(task_id)
        if task:
            return jsonify({"task": {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "author": task.author,
                "created_at": task.created_at.strftime("%Y-%m-%d %H:%M:%S")
            }})
        return jsonify({"message": "Task not found"}), 404

    if request.method == 'PUT':
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        author = data.get('author')

        if not any([title, description, author]):
            return jsonify({"error": "Provide at least one field to update"}), 400

        result = TaskController.update_task(task_id, title, description, author)

        if 'error' in result:
            return jsonify(result), 404
        else:
            return jsonify(result), 200

    elif request.method == 'DELETE':
        result = TaskController.delete_task(task_id)

        if 'error' in result:
            return jsonify(result), 404  # Task not found or other errors
        else:
            return jsonify(result), 200  # Task deleted successfully