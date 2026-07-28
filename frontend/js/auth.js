const API_URL = "https://student-complaint-management-system-beqs.onrender.com";

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

        console.log(result);
        alert("Login successful");

    } catch (err) {
        console.error(err);
        alert("Unable to connect to the server.");
    }
}