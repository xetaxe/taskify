from flask import Blueprint

api_v1 = Blueprint('api', __name__, url_prefix='/api/v1')

# Import and register individual API route files
from . import tasks, register
