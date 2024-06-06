window.onload = function () {
    let params = new URLSearchParams(window.location.search);
    let roomId = params.get('room');
    let bypass = params.get('bypass');
    let roomData = JSON.parse(localStorage.getItem(roomId));

    if (!roomData) {
        alert("Invalid room or room does not exist.");
        window.location.href = "index.html"; // Redirect or handle error
        return;
    }

    if (!bypass) {
        let password = prompt("Enter room password:");
        if (password !== roomData.password) {
            alert("Incorrect password. Access denied.");
            window.location.href = "index.html"; // Redirect or handle error
            return;
        }
    }

    let userName = prompt("Enter your name:");
    // Logic to handle chat room messages
};
