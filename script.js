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
    console.log("Create Room button clicked"); // Check if this message appears in the console

    try {
        let roomName = prompt("Enter room name:");
        if (!roomName) {
            console.log("Room name not provided");
            return; // Exit function if no room name entered
        }

        let hostName = prompt("Enter your name:");
        if (!hostName) {
            console.log("Host name not provided");
            return; // Exit function if no host name entered
        }

        let password = prompt("Enter room password:");
        if (!password) {
            console.log("Password not provided");
            return; // Exit function if no password entered
        }

        // Generate room ID and room link
        let roomId = generateRoomId();
        let roomLink = `${window.location.origin}/chat.html?room=${roomId}&bypass=true`;

        // Example roomData structure
        let roomData = {
            id: roomId,
            name: roomName,
            password: password,
            messages: [],
            host: hostName
        };

        // Example of updating localStorage
        let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
        rooms.push({ name: roomName, link: roomLink });
        localStorage.setItem('rooms', JSON.stringify(rooms));
        localStorage.setItem(roomId, JSON.stringify(roomData));

        // Example of displaying a success message
        alert(`Room created successfully! Share this link: ${roomLink}`);

        // Example of updating room list on the page
        loadRooms(); // Assuming you have a function to load rooms

    } catch (error) {
        console.error('Error creating room:', error);
        alert('An error occurred while creating the room. Please try again.');
    }
}
