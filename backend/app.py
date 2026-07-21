from flask_cors import CORS
from flask import Flask
from database import mysql
import config
from routes.auth import auth
from routes.complaints import complaints
from routes.admin import admin


app = Flask(__name__)

CORS(app)

# MySQL Configuration
app.config["MYSQL_HOST"] = config.MYSQL_HOST
app.config["MYSQL_USER"] = config.MYSQL_USER
app.config["MYSQL_PASSWORD"] = config.MYSQL_PASSWORD
app.config["MYSQL_DB"] = config.MYSQL_DB
app.config["MYSQL_CURSORCLASS"] = config.MYSQL_CURSORCLASS
app.config["MYSQL_PORT"] = config.MYSQL_PORT


# Secret Key
app.secret_key = config.SECRET_KEY

# Initialize MySQL
mysql.init_app(app)

app.register_blueprint(auth)
app.register_blueprint(complaints)
app.register_blueprint(admin)
@app.route("/")
def home():
    return " hiii this is saniya🚀 Automatic Deployment is Working!"

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)