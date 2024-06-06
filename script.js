function createRoom() {
    let roomName = prompt("Enter room name:");
    if (roomName) {
        let password = prompt("Enter room password:");
        let userName = prompt("Enter your name:");
        if (!userName) {
            alert("Name is required to create a room.");
            return;
        }
        let roomId = generateRoomId();
        let roomLink = window.location.origin + "/chat.html?room=" + roomId + "&bypass=true";
        let roomListItem = document.createElement("li");
        roomListItem.innerHTML = `<a href="${window.location.origin}/chat.html?room=${roomId}" target="_blank">${roomName}</a>`;
        document.getElementById("rooms").appendChild(roomListItem);
        localStorage.setItem(roomId, JSON.stringify({ password: password, messages: [], creator: userName }));
        alert(`Room created successfully! Share this link to bypass password: ${roomLink}`);
    }
}

function generateRoomId() {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let roomId = '';
    for (let i = 0; i < 6; i++) {
        roomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return roomId;
}

window.onload = function () {
    let roomsElement = document.getElementById("rooms");
    for (let i = 0; i < localStorage.length; i++) {
        let roomId = localStorage.key(i);
        let roomData = JSON.parse(localStorage.getItem(roomId));
        if (roomData && roomData.password) {
            let roomListItem = document.createElement("li");
            roomListItem.innerHTML = `<a href="${window.location.origin}/chat.html?room=${roomId}" target="_blank">${roomId}</a>`;
            roomsElement.appendChild(roomListItem);
        }
    }
};
