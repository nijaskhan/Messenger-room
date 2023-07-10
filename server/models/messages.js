const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    roomCode: {
        type: String,
        required: true,
    },
    messageData: [{
        roomCode: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        key: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
});

const Messages = mongoose.model('messages', messagesSchema);

module.exports = Messages;