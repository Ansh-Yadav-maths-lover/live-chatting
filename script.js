document.addEventListener("DOMContentLoaded", () => {
    const roomsList = document.getElementById("rooms");

    function loadRooms() {
        const rooms = JSON.parse(localStorage.getItem('rooms')) || [];
        roomsList.innerHTML = '';
        rooms.forEach(room => {
            const roomListItem = document.createElement('li');
            roomListItem.innerHTML = `<a href="${room.link}" target="_blank">${room.name}</a>`;
            roomsList.appendChild(roomListItem);
        });
    }

    function createRoom() {
        let roomName = prompt("Enter room name:");
        if (roomName) {
            let hostName = prompt("Enter your name:");
            let password = prompt("Enter room password:");
            let roomId = generateRoomId();
            let roomLink = window.location.origin + "/chat.html?room=" + roomId + "&bypass=true";
            let roomData = { id: roomId, name: roomName, password: password, messages: [], host: hostName };
            
            let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
            rooms.push({ name: roomName, link: roomLink });
            localStorage.setItem('rooms', JSON.stringify(rooms));
            localStorage.setItem(roomId, JSON.stringify(roomData));
            
            loadRooms();
            alert(`Room created successfully! Share this link: ${roomLink}`);
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

    loadRooms();
});
