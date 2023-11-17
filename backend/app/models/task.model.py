from datetime import datetime

class Task:
    def __init__(self, title, description, creator):
        self.title = title
        self.description = description
        self.creator = creator
        self.created_at = datetime.now()

    # Method to update task details
    def update_task(self, title=None, description=None, creator=None):
        if title:
            self.title = title
        if description:
            self.description = description
        if creator:
            self.creator = creator

    # Method to get task details as a dictionary
    def task_details(self):
        return {
            "title": self.title,
            "description": self.description,
            "creator": self.creator,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }