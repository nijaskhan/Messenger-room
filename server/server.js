const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const Messages = require('./models/messages');
const PORT = process.env.PORT || 5000;
const routes = require('./routes');

app.use(cors());
app.use('/api', routes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        // origin: 'https://messenger-room-xi.vercel.app',
        methods: ['GET', 'POST']
    }
});
const onlineUsers = new Set();

io.on('connection', (socket) => {
    console.log(`socket connected to ${socket.id}`);

    socket.on('join_room', ({ roomCode, username, login }) => {
        onlineUsers.add(username);
        if (username && roomCode) {
            socket.join(roomCode);
            console.log(`${username} joined in roomcode: ${roomCode}`);
            if(!login) {
                socket.to(roomCode).emit('userJoined', username);
            }
        };
    });

    socket.on("sendMessage", async(messageData) => {
        const isExist = await Messages.findOne({roomCode: messageData.roomCode}).exec();
        console.log(isExist);
        if(!isExist) {
            const newMessage = new Messages({
                roomCode: messageData.roomCode,
                messageData: [messageData]
            });
            await newMessage.save();
        }else{
            const message = await Messages.updateOne({roomCode: messageData.roomCode}, 
                {$push: {messageData: messageData}}
            )
        }
        socket.to(messageData.roomCode).emit("receiveMessage", messageData);
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`server connected to port ${PORT}`);
});