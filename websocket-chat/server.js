const express = require('express')
const http = require('http')
const Websocket = require('ws')
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new Websocket.Server({ server });

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')))

// Websocket connection handling
wss.on('connection', (socket) => {
    console.log('Client Connected');

    socket.on('message', (message) => {
        console.log('Received:', message);

        // Broadcast to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === Websocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Client Disconnected');
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
});
