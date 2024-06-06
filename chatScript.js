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

    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');

    function updateChatBox() {
        chatBox.innerHTML = '';
        roomData.messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
        });
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            roomData.messages.push(message);
            localStorage.setItem(roomId, JSON.stringify(roomData));
            messageInput.value = '';
            updateChatBox();
        }
    }

    document.querySelector('button').addEventListener('click', sendMessage);
    updateChatBox();
};
