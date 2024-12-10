const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create an Express application
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (like portfolio.html and portfolio.js) from the current directory
app.use(express.static(__dirname));

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for 'greeting' events from the client
    socket.on('greeting', (data) => {
        console.log('Received greeting:', data);
        // Respond with a personalized message
        const response = `Hello, ${data.name} from ${data.country}! Nice to meet you.`;
        socket.emit('response', response);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on port 8080
server.listen(8080, () => {
    console.log('Socket.IO server is running on http://localhost:8080');
});
