# Taskify

## Overview
Welcome to TASKIFY, a full-stack Task management application (built over a weekend...). Let your tasks be viewed by anyone, if this is what you are into... But bear in mind that only registered users can create, update and delete tasks.

## Basic Structure
The repo contains two folders, ```/frontend``` and ```/backend```. 
- The frontend is built with Vite and React, utilizing npm for package management. 
- The backend is a Flask application integrated with SQLAlchemy, using a SQLite database for data storage.
- Besides the two folders, there is a run.sh file with useful bash scripts to run, build and start the application.

## Install and run
To set up the project, follow these steps:
1. Clone this repository.
2. Navigate to the root directory.
3. Install dependencies for the frontend:
   ```bash
   cd frontend
   #Assuming you have npm installed
   npm install
   ```
4. Install dependencies for the backend:
   ```bash
   #If you were on /frontend
   cd ..
   cd backend

   (#Before installing, it is recommended to create a specific Python environment for the project!! This highly depends on the OS and terminal you use. For Windows + Bash, it would look something like this:
   python -m venv myenv
   source myenv/Scripts/activate)

   #Assuming you have pip installed
   pip install -r requirements.txt

   #Go back to root
   cd ..
   ```
5. Run the application in dev mode (replace "dev" by "front" (resp. "back") to run only the frontend (resp. backend) in dev mode). For development purposes:
    ```bash
    ./run.sh dev
    ```
6. Build the application (frontend):
    ```bash
    ./run.sh build
    ```
7. Start the application in localhost:
    ```bash
    ./run.sh start
    ```