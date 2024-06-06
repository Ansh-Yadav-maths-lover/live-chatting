function createRoom() {
    let roomName = prompt("Enter room name:");
    if (roomName) {
        let roomId = generateRoomId();
        let roomLink = window.location.origin + "/chat.html?room=" + roomId;
        let roomListItem = document.createElement("li");
        roomListItem.innerHTML = `<a href="${roomLink}" target="_blank">${roomName}</a>`;
        document.getElementById("rooms").appendChild(roomListItem);
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
