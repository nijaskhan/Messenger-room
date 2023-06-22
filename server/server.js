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
        origin: 'https://messenger-room-xi.vercel.app',
        methods: ['GET',  'POST']
    }
});

io.on('connection', (socket)=>{
    console.log(`socket connected to ${socket.id}`);

    socket.on('join_room', ({roomCode, username})=>{
        socket.join(roomCode);   //joining to the room_code
        console.log(`${username} joined in roomcode: ${roomCode}`);
    });

    socket.on("sendMessage", (messageData)=>{
        socket.to(messageData.roomCode).emit("receiveMessage", messageData);
    });

    socket.on('disconnect', ()=>{
        console.log('socket disconnected');
    });
});

server.listen(PORT, ()=>{
    console.log(`server connected to port ${PORT}`);
});