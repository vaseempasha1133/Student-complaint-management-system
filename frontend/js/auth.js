const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function(e) {

        e.preventDefault();

        const student = {
            name: document.getElementById("name").value,
            roll_number: document.getElementById("roll_number").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            department: document.getElementById("department").value,
            year: document.getElementById("year").value,
            password: document.getElementById("password").value
        };

        const response = await fetch("http://127.0.0.1:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const result = await response.json();

        alert(result.message);

        if(response.status === 201){
            window.location.href = "student-login.html";
        }

    });

}
// ----------------------------
// Student Login
// ----------------------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const loginData = {

            email: document.getElementById("email").value,
            password: document.getElementById("password").value

        };

        const response = await fetch("http://127.0.0.1:5000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)

        });

        const result = await response.json();

        alert(result.message);

        if (response.status === 200) {

            localStorage.setItem(
                "student",
                JSON.stringify(result.student)
            );

            window.location.href = "dashboard.html";

        }

    });

}   