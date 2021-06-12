const uuid = require("uuid").v1;
const userConnectionRepository = require("../dbal/userConnectionRepository");
const axios = require('axios')

exports.getUuid = async () => {
  return uuid();
};

exports.saveImage = async (base64) => {
  const data = JSON.stringify({
    name: 'image',
    payload: base64
  })

  const response = await axios.post('https://google-cloud-task-processor.herokuapp.com/storage/image', data)
  return response.data.url
}

exports.saveMessage = async (message) => {
  const connection = await userConnectionRepository.findConnectionByRoomId(
    message.chatId,
    message.senderId
  );
  const receiverId = connection._to;
  const dbMessage = createDbMessage(message);
  console.log(dbMessage)
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
};

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
