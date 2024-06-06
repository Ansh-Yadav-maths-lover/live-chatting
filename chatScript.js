window.onload = function () {
    let params = new URLSearchParams(window.location.search);
    let roomId = params.get('room');
    let bypass = params.get('bypass');
    let roomData = JSON.parse(localStorage.getItem(roomId));

    if (!roomData) {
        alert("Invalid room or room does not exist.");
        window.location.href = "index.html";
        return;
    }

    if (!bypass) {
        let password = prompt("Enter room password:");
        if (password !== roomData.password) {
            alert("Incorrect password. Access denied.");
            window.location.href = "index.html";
            return;
        }
    }

    let userName = prompt("Enter your name:");

    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');

    function updateChatBox() {
        chatBox.innerHTML = '';
        roomData.messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${message.sender}: ${message.text}`;
            messageElement.className = message.sender === userName ? 'message-right' : 'message-left';
            chatBox.appendChild(messageElement);
        });
    }

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const message = { sender: userName, text: messageText };
            roomData.messages.push(message);
            localStorage.setItem(roomId, JSON.stringify(roomData));
            messageInput.value = '';
            updateChatBox();
        }
    }

    document.querySelector('button').addEventListener('click', sendMessage);
    updateChatBox();
};
