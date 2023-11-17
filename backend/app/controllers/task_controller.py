from app.models.task import Task
from app.db.db import db

class TaskController:
    @staticmethod
    def get_tasks():
        try:
            tasks = Task.query.all()
            return [task.serialize() for task in tasks]
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def get_task(task_id):
        return Task.query.get(task_id)
    
    @staticmethod
    def create_task(title, description, author_id):
        new_task = Task(title=title, description=description, author_id=author_id)
        try:
            db.session.add(new_task)
            db.session.commit()
            return {"message": "Task created successfully", "task_id": new_task.id}
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}

    @staticmethod
    def update_task(task_id, title, description, author_id):
        try:
            task = Task.query.get(task_id)
            if not task:
                return {"error": "Task not found"}

            # Update task attributes if corresponding arguments are provided
            if title:
                task.title = title
            if description:
                task.description = description
            if author_id:
                task.author_id = author_id

            db.session.commit()
            return {"message": "Task updated successfully"}
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}
        
    @staticmethod
    def delete_task(task_id):
        try:
            task = Task.query.get(task_id)
            if not task:
                return {"error": "Task not found"}

            db.session.delete(task)
            db.session.commit()
            return {"message": "Task deleted successfully"}
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}