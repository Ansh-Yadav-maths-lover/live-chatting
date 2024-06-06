window.onload = function () {
    let roomId = new URLSearchParams(window.location.search).get('room');
    let roomData = JSON.parse(localStorage.getItem(roomId));
    
    if (!roomData) {
        alert("Invalid room or room does not exist.");
        window.location.href = "index.html";
    }

    let password = prompt("Enter room password:");
    if (password !== roomData.password) {
        alert("Incorrect password. Access denied.");
        window.location.href = "index.html";
    }

    // Rest of the code for handling messages in the chat room goes here...
};
