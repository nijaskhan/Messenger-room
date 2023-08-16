const Messages = require("../models/messages");

module.exports = {
    getMessages: async (req, res) => {
        try {
            const messageDatas = await Messages.findOne({ roomCode: req.query.roomCode })
                .select('messageData') // Assuming the array is stored in a field named "messageDatas"
                .slice('messageData', [req.query.page*5, (req.query.page*5)+5]) // Slice the "messageDatas" array from index 0 to 4 (first 5 elements)
                .exec();
            res.status(200).json({
                status: true,
                messageDatas
            });
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message
            });
        }
    }
}