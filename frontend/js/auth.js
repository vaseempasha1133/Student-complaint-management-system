const API_URL =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://127.0.0.1:5000"
        : "/api";

async function register(data) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            window.location.href = "student-login.html";
        }
    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}

async function login(data) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const text = await response.text();
        console.log("Server response:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (err) {
            console.error("Server returned HTML:", text);
            alert("Server error. Check your backend logs.");
            return;
        }

        if (!response.ok) {
            alert(result.message || "Login failed");
            return;
        }
        localStorage.setItem("student", JSON.stringify(result.student));
        alert("Login successful");
        window.location.href = "dashboard.html";

    } catch (err) {
        console.error(err);
        alert("Unable to connect to the server.");
    }
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        login({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        });
    });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        register({
            name: document.getElementById("name").value,
            roll_number: document.getElementById("roll_number").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            department: document.getElementById("department").value,
            year: document.getElementById("year").value,
            password: document.getElementById("password").value
        });
    });
}