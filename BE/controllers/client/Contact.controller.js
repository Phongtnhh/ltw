const News = require("../../model/News.model")
const Chat = require("../../model/Chat.model")

module.exports.index = async (req, res) => {
    _io.once('connection', (socket) => {
        socket.emit('message', (context) => {
            const chat = new Chat({
                account_id : context.account_id,
                content : context.content
            });
            chat.save();
            _io.emit('message', chat);
        });
    });

    const chats = await Chat.find({
        deleted: false,
    });
    for(const chat of chats){
        const infoUser = await Account.findById(chat.account_id);
        chat.account_id = infoUser.fullName;
    }
    res.status(500).json({
        success: true,
        data: chats
    })
}