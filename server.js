const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = './rooms.json';

app.use(bodyParser.json());
app.use(cors());

// Load rooms data
let rooms = {};
if (fs.existsSync(DATA_FILE)) {
    rooms = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// Save rooms data
const saveRooms = () => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(rooms, null, 2));
};

// Create a new room
app.post('/create-room', (req, res) => {
    const { roomId, roomName, password, userName } = req.body;
    rooms[roomId] = { roomName, password, messages: [], creator: userName };
    saveRooms();
    res.json({ success: true, roomId });
});

// Get room data
app.get('/room/:roomId', (req, res) => {
    const roomId = req.params.roomId;
    const room = rooms[roomId];
    if (room) {
        res.json(room);
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
});

// Add a new message
app.post('/room/:roomId/message', (req, res) => {
    const roomId = req.params.roomId;
    const { user, text } = req.body;
    const room = rooms[roomId];
    if (room) {
        room.messages.push({ user, text });
        saveRooms();
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
});

// Get all rooms
app.get('/rooms', (req, res) => {
    res.json(rooms);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
