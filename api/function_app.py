import azure.functions as func 
from flask import Flask, request, Response, redirect, url_for 

flask_app = Flask(__name__)

@flask_app.get("/settings/current") 
def getCurrentSetting(): 
    return {"name": "Setting"}

@flask_app.get("/talents/{name}") 
def getTalent(name: str): 
    return

@flask_app.post("/talents/{name}")
def createTalent(name: str): 
    return

app = func.WsgiFunctionApp(app=flask_app.wsgi_app, 
                           http_auth_level=func.AuthLevel.ANONYMOUS)