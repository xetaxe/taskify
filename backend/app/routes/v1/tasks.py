from flask import request
from . import api_v1

# Route for handling GET and POST requests
@api_v1.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        # Handle GET request
        return 'GET Request: Retrieve tasks'

    elif request.method == 'POST':
        # Handle POST request
        new_task = request.json
        return f'POST Request: Create task - {new_task}'

# Route for handling PUT and DELETE requests for a specific task
@api_v1.route('/tasks/<int:task_id>', methods=['PUT', 'DELETE'])
def specific_task(task_id):
    if request.method == 'PUT':
        # Handle PUT request
        updated_task = request.json
        return f'PUT Request: Update task {task_id} - {updated_task}'

    elif request.method == 'DELETE':
        # Handle DELETE request
        return f'DELETE Request: Delete task {task_id}'
