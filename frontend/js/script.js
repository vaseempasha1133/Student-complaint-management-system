const student = JSON.parse(localStorage.getItem("student"));

if (!student) {
    window.location.href = "student-login.html";
}

document.getElementById("studentName").textContent = student.name;
document.getElementById("studentEmail").textContent = student.email;
document.getElementById("studentRoll").textContent = student.roll_number;

document.getElementById("logoutBtn").addEventListener("click", async () => {

    document.getElementById("logoutBtn").addEventListener("click", function () {

    localStorage.removeItem("student");

    alert("Logout Successful");

    window.location.href = "student-login.html";

});

    localStorage.removeItem("student");

    alert("Logout Successful");

    window.location.href = "student-login.html";

});