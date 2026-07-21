const adminLoginForm = document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const adminData = {

            username: document.getElementById("username").value,
            password: document.getElementById("password").value

        };

        const response = await fetch("http://13.50.107.23/admin/api/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(adminData)

        });

        const result = await response.json();

        alert(result.message);

        if (response.status === 200) {

            window.location.href = "admin-dashboard.html";

        }

    });

}
// ----------------------------
// Admin Logout
// ----------------------------

async function adminLogout() {

    const response = await fetch(
        "http://13.50.107.23/admin/api/logout",
        {
            method: "POST"
        }
    );

    const result = await response.json();

    alert(result.message);

    if (response.status === 200) {
        window.location.href = "admin-login.html";
    }
}
// ----------------------------
// Load All Complaints
// ----------------------------

async function loadAllComplaints() {

    const table = document.getElementById("adminComplaintTable");

    if (!table) return;

    try {

        const response = await fetch("http://13.50.107.23/admin/api/complaints");

        const complaints = await response.json();

        table.innerHTML = "";

        complaints.forEach(function(complaint) {

            table.innerHTML += `
            <tr>

                <td>${complaint.complaint_id}</td>
                <td>${complaint.name}</td>
                <td>${complaint.roll_number}</td>
                <td>${complaint.category}</td>
                <td>${complaint.subject}</td>
                <td>${complaint.description}</td>
                <td>${complaint.status}</td>
                <td>${complaint.remarks || "-"}</td>

                <td>
                    <button
                        class="btn btn-primary btn-sm"
                        onclick="updateStatus(${complaint.complaint_id})">

                        Update

                    </button>
                </td>

            </tr>
            `;

        });

    }
    catch(error){

        console.log(error);
        alert("Unable to load complaints.");

    }

}

loadAllComplaints();
// ----------------------------
// Update Complaint Status
// ----------------------------

async function updateStatus(complaintId) {

    const status = prompt(
        "Enter Status (Pending, In Progress, Resolved):"
    );

    if (!status) {
        return;
    }

    const remarks = prompt(
        "Enter Remarks:"
    );

    const response = await fetch(
        `http://13.50.107.23/admin/api/complaints/${complaintId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status: status,
                remarks: remarks
            })
        }
    );

    const result = await response.json();

    alert(result.message);

    loadAllComplaints();

}