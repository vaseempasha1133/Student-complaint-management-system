from flask import Blueprint, request, jsonify, session
from database import mysql

auth = Blueprint("auth", __name__)


# ----------------------------
# Student Registration
# ----------------------------
@auth.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data["name"]
    roll_number = data["roll_number"]
    email = data["email"]
    phone = data["phone"]
    department = data["department"]
    year = data["year"]
    password = data["password"]

    cur = mysql.connection.cursor()

    cur.execute("""
        INSERT INTO students
        (name, roll_number, email, phone, department, year, password)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (name, roll_number, email, phone, department, year, password))

    mysql.connection.commit()
    cur.close()

    return jsonify({
        "message": "Student Registered Successfully"
    }), 201


# ----------------------------
# Student Login
# ----------------------------
@auth.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    cur = mysql.connection.cursor()

    cur.execute(
        "SELECT * FROM students WHERE email=%s AND password=%s",
        (email, password)
    )

    student = cur.fetchone()

    cur.close()

    if student:
        # Store session data
        session["student_id"] = student["student_id"]
        session["student_name"] = student["name"]
        session["student_email"] = student["email"]

        return jsonify({
            "message": "Login Successful",
            "student": {
                "student_id": student["student_id"],
                "name": student["name"],
                "email": student["email"],
                "roll_number": student["roll_number"]
            }
        }), 200

    return jsonify({
        "message": "Invalid Email or Password"
    }), 401


# ----------------------------
# Student Logout
# ----------------------------
@auth.route("/logout", methods=["POST"])
def logout():

    session.clear()

    return jsonify({
        "message": "Logout Successful"
    }), 200