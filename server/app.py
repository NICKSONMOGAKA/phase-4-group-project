from flask import Flask, make_response, request
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import db


app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"

migrate=Migrate(app, db)
db.init_app(app)

api=Api(app)


@app.route("/")
def index():
    return "Welcome to flask"

if __name__=='__main__':
    app.run(port=5500, debug=True)