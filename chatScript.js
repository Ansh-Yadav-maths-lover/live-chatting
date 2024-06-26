import { db } from './firebaseConfig.js';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

window.onload = async function () {
    let params = new URLSearchParams(window.location.search);
    let roomId = params.get('room');
    let bypass = params.get('bypass') === 'true';

    try {
        const docRef = doc(db, "rooms", roomId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            alert("Invalid room or room does not exist.");
            window.location.href = "index.html";
            return;
        }

        let roomData = docSnap.data();

        if (!bypass) {
            let password = prompt("Enter room password:");
            if (password !== roomData.password) {
                alert("Incorrect password. Access denied.");
                window.location.href = "index.html";
                return;
            }
        }

        let userName = localStorage.getItem(`${roomId}-userName`);
        if (!userName) {
            userName = prompt("Enter your name:");
            if (!userName) {
                alert("Name is required to enter the chat room.");
                window.location.href = "index.html";
                return;
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

        sendMessageBtn.addEventListener("click", async () => {
            let messageText = messageInput.value.trim();
            if (messageText === "") return;

            let message = {
                user: userName,
                text: messageText
            };

            displayMessage(message);

            try {
                await updateDoc(docRef, {
                    messages: arrayUnion(message)
                });
            } catch (error) {
                console.error('Error sending message:', error);
            }

            messageInput.value = "";
        });

        // Display existing messages when entering the chat room
        roomData.messages.forEach(message => {
            displayMessage(message);
        });
    } catch (error) {
        console.error('Error loading room data:', error);
    }
};
