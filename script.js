async function createRoom() {
    let roomName = prompt("Enter room name:");
    if (roomName) {
        let password = prompt("Enter room password:");
        let userName = prompt("Enter your name:");
        if (!userName) {
            alert("Name is required to create a room.");
            return;
        }
        let roomId = generateRoomId();
        try {
            let response = await fetch('http://localhost:3000/create-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId, roomName, password, userName })
            });
            let result = await response.json();
            if (result.success) {
                let roomLink = window.location.origin + "/chat.html?room=" + roomId + "&bypass=true";
                let roomListItem = document.createElement("li");
                roomListItem.innerHTML = `<a href="${window.location.origin}/chat.html?room=${roomId}" target="_blank">${roomName}</a>`;
                document.getElementById("rooms").appendChild(roomListItem);
                alert(`Room created successfully! Share this link to bypass password: ${roomLink}`);
            }
        } catch (error) {
            console.error('Error creating room:', error);
        }
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

async function loadRooms() {
    let roomsElement = document.getElementById("rooms");
    try {
        let response = await fetch('http://localhost:3000/rooms');
        let rooms = await response.json();
        Object.keys(rooms).forEach(roomId => {
            let room = rooms[roomId];
            let roomListItem = document.createElement("li");
            roomListItem.innerHTML = `<a href="${window.location.origin}/chat.html?room=${roomId}" target="_blank">${room.roomName}</a>`;
            roomsElement.appendChild(roomListItem);
        });
    } catch (error) {
        console.error('Error loading rooms:', error);
    }
}

window.onload = loadRooms;
