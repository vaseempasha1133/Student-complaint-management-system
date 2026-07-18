from flask import Blueprint, request, jsonify
from database import mysql

complaints = Blueprint("complaints", __name__)


# ----------------------------
# Submit Complaint
# ----------------------------
@complaints.route("/complaints", methods=["POST"])
def submit_complaint():

    data = request.get_json()

    student_id = data["student_id"]
    category = data["category"]
    subject = data["subject"]
    description = data["description"]

    cur = mysql.connection.cursor()

    cur.execute("""
        INSERT INTO complaints
        (student_id, category, subject, description)
        VALUES (%s, %s, %s, %s)
    """, (student_id, category, subject, description))

    mysql.connection.commit()
    cur.close()

    return jsonify({
        "message": "Complaint Submitted Successfully"
    }), 201


# ----------------------------
# View Student Complaints
# ----------------------------
@complaints.route("/complaints/<int:student_id>", methods=["GET"])
def get_student_complaints(student_id):

    cur = mysql.connection.cursor()

    cur.execute("""
        SELECT complaint_id, category, subject, description, status, created_at
        FROM complaints
        WHERE student_id = %s
        ORDER BY created_at DESC
    """, (student_id,))

    complaints_list = cur.fetchall()

    cur.close()

    return jsonify(complaints_list), 200


# ----------------------------
# Update Complaint
# ----------------------------
@complaints.route("/complaints/<int:complaint_id>", methods=["PUT"])
def update_complaint(complaint_id):

    data = request.get_json()

    category = data["category"]
    subject = data["subject"]
    description = data["description"]

    cur = mysql.connection.cursor()

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

    cur.execute("""
        UPDATE complaints
        SET category=%s,
            subject=%s,
            description=%s
        WHERE complaint_id=%s
    """, (category, subject, description, complaint_id))

    mysql.connection.commit()
    cur.close()

    return jsonify({
        "message": "Complaint Updated Successfully"
    }), 200


# ----------------------------
# Delete Complaint
# ----------------------------
@complaints.route("/complaints/<int:complaint_id>", methods=["DELETE"])
def delete_complaint(complaint_id):

    cur = mysql.connection.cursor()

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

    cur.execute(
        "DELETE FROM complaints WHERE complaint_id=%s",
        (complaint_id,)
    )

    mysql.connection.commit()
    cur.close()

    return jsonify({
        "message": "Complaint Deleted Successfully"
    }), 200