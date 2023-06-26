const Messages = require("../Models/messages");

module.exports = {
    getMessages: async(req, res) => {
        try{
            const messageDatas = await Messages.find({roomCode: req.query.roomCode}).exec();
            res.status(200).json({
                status: true,
                messageDatas
            });
        }catch(err){
            res.status(500).json({
                status: false,
                message: err.message
            });
        }
    }
}