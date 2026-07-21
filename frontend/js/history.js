const student = JSON.parse(localStorage.getItem("student"));

if (!student) {
    alert("Please login first.");
    window.location.href = "student-login.html";
}

async function loadComplaints() {

    try {

        const response = await fetch(
            `http://13.50.107.23/api/complaints/${student.student_id}`
        );

        const complaints = await response.json();

        const table = document.getElementById("complaintsTable");

        table.innerHTML = "";

        complaints.forEach(function(complaint) {

            table.innerHTML += `
                <tr>
                    <td>${complaint.complaint_id}</td>
                    <td>${complaint.category}</td>
                    <td>${complaint.subject}</td>
                    <td>${complaint.description}</td>
                    <td>${complaint.status}</td>
                    <td>${complaint.created_at}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.log(error);
        alert("Unable to load complaints.");

    }

}

loadComplaints();