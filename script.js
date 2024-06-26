import { db } from './firebaseConfig.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const createRoomBtn = document.getElementById("create-room-btn");
const roomsList = document.getElementById("rooms");

createRoomBtn.addEventListener("click", async () => {
    let roomName = prompt("Enter room name:");
    if (roomName) {
        let password = prompt("Enter room password:");
        let userName = prompt("Enter your name:");
        if (!userName) {
            alert("Name is required to create a room.");
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "rooms"), {
                roomName,
                password,
                userName,
                messages: []
            });
            let roomId = docRef.id;
            let roomLink = `${window.location.origin}/chat.html?room=${roomId}&bypass=true`;
            let roomListItem = document.createElement("li");
            roomListItem.innerHTML = `<a href="${window.location.origin}/chat.html?room=${roomId}" target="_blank">${roomName}</a>`;
            roomsList.appendChild(roomListItem);
            alert(`Room created successfully! Share this link to bypass password: ${roomLink}`);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
});

async function loadRooms() {
    try {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        querySnapshot.forEach((doc) => {
            let room = doc.data();
            let roomListItem = document.createElement("li");
            roomListItem.innerHTML = `<a href="${window.location.origin}/chat.html?room=${doc.id}" target="_blank">${room.roomName}</a>`;
            roomsList.appendChild(roomListItem);
        });
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

window.onload = loadRooms;
