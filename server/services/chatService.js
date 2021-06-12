const uuid = require("uuid").v1;
const userConnectionRepository = require("../dbal/userConnectionRepository");

exports.getUuid = async () => {
  return uuid();
};

exports.saveMessage = async (message) => {
  const connection = await userConnectionRepository.findConnectionByRoomId(
    message.chatId,
    message.senderId
  );
  const receiverId = connection._to;
  const dbMessage = createDbMessage(message);
  await userConnectionRepository.appendToConnectionById(
    message.chatId,
    message.senderId,
    dbMessage
  );
  await userConnectionRepository.appendToConnectionById(
    message.chatId,
    receiverId,
    dbMessage
  );
};

exports.updateMessage = async (message) => {
  const connection = await userConnectionRepository.findConnectionByRoomId(
      message.chatId,
      message.senderId
  );
  const receiverId = connection._to;
  await userConnectionRepository.replaceInConnectionById(
      message.chatId,
      message.senderId,
      message
  );
  await userConnectionRepository.appendToConnectionById(
      message.chatId,
      receiverId,
      message
  );
}
exports.getMessages = async (chatId, userId) => {
  const result = await userConnectionRepository.findConnectionByRoomId(
    chatId,
    userId
  );
  return result.chat;
};

const createDbMessage = (message) => {
  return {
    uuid: message.uuid,
    body: message.body,
    url: message.url,
    senderId: message.senderId,
  };
};
