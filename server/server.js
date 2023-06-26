const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // origin: 'http://localhost:3000',
        origin: 'https://messenger-room-xi.vercel.app',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`socket connected to ${socket.id}`);

    socket.on('join_room', ({ roomCode, username, login }) => {
        if (username && roomCode) {
            socket.join(roomCode)
            console.log(`${username} joined in roomcode: ${roomCode}`);
            if(!login) {
                socket.to(roomCode).emit('userJoined', username);
            }
        };
    });

    socket.on("sendMessage", (messageData) => {
        socket.to(messageData.roomCode).emit("receiveMessage", messageData);
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`server connected to port ${PORT}`);
});