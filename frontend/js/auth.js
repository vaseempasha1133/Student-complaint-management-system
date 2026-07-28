const response = await fetch(API_URL + "/login", {
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
    throw new Error("Server returned HTML instead of JSON:\n" + text);
}