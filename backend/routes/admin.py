from flask import Blueprint, request, jsonify, session
from database import mysql

admin = Blueprint("admin", __name__)


# ----------------------------
# Admin Login
# ----------------------------
@admin.route("/admin/login", methods=["POST"])
def admin_login():

    data = request.get_json()

    username = data["username"]
    password = data["password"]

    cur = mysql.connection.cursor()

    cur.execute(
        "SELECT * FROM admins WHERE username=%s AND password=%s",
        (username, password)
    )

    admin_user = cur.fetchone()

    cur.close()

    if admin_user:

        session["admin_id"] = admin_user["admin_id"]
        session["admin_username"] = admin_user["username"]

        return jsonify({
            "message": "Admin Login Successful",
            "admin": {
                "admin_id": admin_user["admin_id"],
                "username": admin_user["username"]
            }
        }), 200

    return jsonify({
        "message": "Invalid Username or Password"
    }), 401
# ----------------------------
# View All Complaints
# ----------------------------
@admin.route("/admin/complaints", methods=["GET"])
def view_all_complaints():

    cur = mysql.connection.cursor()

    cur.execute("""
        SELECT
            complaints.complaint_id,
            students.name,
            students.roll_number,
            complaints.category,
            complaints.subject,
            complaints.description,
            complaints.status,
            complaints.created_at
        FROM complaints
        JOIN students
        ON complaints.student_id = students.student_id
        ORDER BY complaints.created_at DESC
    """)

    complaints = cur.fetchall()

    cur.close()

    return jsonify(complaints), 200
# ----------------------------
# Update Complaint Status
# ----------------------------
@admin.route("/admin/complaints/<int:complaint_id>", methods=["PUT"])
def update_complaint_status(complaint_id):

    data = request.get_json()

    status = data["status"]
    remarks = data["remarks"]

    cur = mysql.connection.cursor()

    # Check whether complaint exists
    cur.execute(
        "SELECT * FROM complaints WHERE complaint_id=%s",
        (complaint_id,)
    )

    complaint = cur.fetchone()

    if not complaint:
        cur.close()
        return jsonify({
            "message": "Complaint Not Found"
        }), 404

    # Update status and remarks
    cur.execute("""
        UPDATE complaints
        SET status=%s,
            remarks=%s
        WHERE complaint_id=%s
    """, (status, remarks, complaint_id))

    mysql.connection.commit()
    cur.close()

    return jsonify({
        "message": "Complaint Status Updated Successfully"
    }), 200