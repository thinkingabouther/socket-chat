const socket = require("socket.io");
const chatService = require("../services/chatService")
const usersToSockets = {}
module.exports = (server) => {
    const io = socket(server);
    io.on("connection", socket => {
        console.log(`socket with id ${socket.id} connected!`);

        socket.on("user/join", async (message) => {
            usersToSockets[message.userId] = socket.id
            console.log(usersToSockets)
            const messages = await chatService.getMessages(message.chatId, message.userId)
            socket.emit('message/all', messages)
        })

        socket.on("message/new", async (message) => {
            await chatService.saveMessage(message)
            const messages = await chatService.getMessages(message.chatId, message.senderId)
            io.to(usersToSockets[message.receiverId]).emit('message/all', messages)
            socket.emit('message/all', messages)
        })
    })
}