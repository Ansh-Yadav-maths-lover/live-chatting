window.onload = function () {
    let params = new URLSearchParams(window.location.search);
    let roomId = params.get('room');
    let bypass = params.get('bypass');
    let roomData = JSON.parse(localStorage.getItem(roomId));

    if (!roomData) {
        alert("Invalid room or room does not exist.");
        window.location.href = "index.html";
    }

    if (!bypass) {
        let password = prompt("Enter room password:");
        if (password !== roomData.password) {
            alert("Incorrect password. Access denied.");
            window.location.href = "index.html";
        }
    }

    let userName = prompt("Enter your name:");
    if (!userName) {
        alert("Name is required to enter the chat room.");
        window.location.href = "index.html";
    }

    // Implement chat functionality
    // Example:
    // 1. Display existing messages
    // 2. Send messages and update chat box

    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message-input");
    const sendMessageBtn = document.getElementById("send-message-btn");

    sendMessageBtn.addEventListener("click", () => {
        let messageText = messageInput.value.trim();
        if (messageText === "") return;

        let message = {
            user: userName,
            text: messageText,
            timestamp: new Date().toLocaleString()
        };

        // Example: Display message on right for current user, left for others
        displayMessage(message, true);

        // Example: Store message in roomData and update localStorage
        roomData.messages.push(message);
        localStorage.setItem(roomId, JSON.stringify(roomData));

        messageInput.value = "";
    });

    function displayMessage(message, isCurrentUser) {
        let messageClass = isCurrentUser ? "message-right" : "message-left";
        let messageElement = `<div class="${messageClass}">
                                <strong>${message.user}</strong> (${message.timestamp}): ${message.text}
                              </div>`;
        chatBox.innerHTML += messageElement;
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    }

    // Display existing messages when entering the chat room
    roomData.messages.forEach(message => {
        displayMessage(message, message.user === userName);
    });

};
