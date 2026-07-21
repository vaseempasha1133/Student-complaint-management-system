const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {

    complaintForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        // Get logged-in student
        const student = JSON.parse(localStorage.getItem("student"));

        if (!student) {
            alert("Please login first.");
            window.location.href = "student-login.html";
            return;
        }

        const complaintData = {

            student_id: student.student_id,
            category: document.getElementById("category").value,
            subject: document.getElementById("subject").value,
            description: document.getElementById("description").value

        };

        const response = await fetch("http://13.50.107.23/complaints", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(complaintData)

        });

        const result = await response.json();

        alert(result.message);

       if (response.status === 201) {

    alert("Complaint Submitted Successfully");

    complaintForm.reset();

    // Redirect to Dashboard after 1 second
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);

}
    });

}