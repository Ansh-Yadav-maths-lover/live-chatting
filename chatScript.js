window.onload = function () {
    let params = new URLSearchParams(window.location.search);
    let roomId = params.get('room');
    let bypass = params.get('bypass');
    let roomData = JSON.parse(localStorage.getItem(roomId));

    if (!roomData) {
        alert("Invalid room or room does not exist.");
        window.location.href = "index.html";
    }

    let userName = localStorage.getItem(`${roomId}-userName`);
    if (!userName) {
        userName = prompt("Enter your name:");
        if (!userName) {
            alert("Name is required to enter the chat room.");
            window.location.href = "index.html";
        }
        localStorage.setItem(`${roomId}-userName`, userName);
    }

    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message-input");
    const sendMessageBtn = document.getElementById("send-message-btn");

    function displayMessage(message) {
        let messageClass = (message.user === userName) ? "message-right" : "message-left";
        let messageElement = `<div class="${messageClass}">
                                <strong>${message.user}</strong>: ${message.text}
                              </div>`;
        chatBox.innerHTML += messageElement;
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    }

    sendMessageBtn.addEventListener("click", () => {
        let messageText = messageInput.value.trim();
        if (messageText === "") return;

        let message = {
            user: userName,
            text: messageText
        };

        displayMessage(message);

        roomData.messages.push(message);
        localStorage.setItem(roomId, JSON.stringify(roomData));

        messageInput.value = "";
    });

    // Display existing messages when entering the chat room
    roomData.messages.forEach(message => {
        displayMessage(message);
    });
};
