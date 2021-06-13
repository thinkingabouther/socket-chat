const getUuid = async () => {
  const res = await fetch("/api/chat/uuid", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await res.json();
  return body.uuid;
};

exports.constructNewMessage = async (
  userId,
  currentMessage,
  friendId,
  chatId
) => {
  return {
    uuid: await getUuid(),
    body: currentMessage,
    url: "",
    senderId: userId,
    receiverId: friendId,
    chatId: chatId,
  };
};

exports.constructUpdateMessage = (
  userId,
  messageToUpdateUuid,
  currentMessage,
  friendId,
  chatId
) => {
  return {
    uuid: messageToUpdateUuid,
    body: currentMessage,
    url: "",
    senderId: userId,
    receiverId: friendId,
    chatId: chatId,
  };
};

exports.constructMessageWithImage = async (userId, url, friendId, chatId) => {
  return {
    uuid: await getUuid(),
    body: "",
    url: url,
    senderId: userId,
    receiverId: friendId,
    chatId: chatId,
  };
};
