const chatService = require("../services/chatService");

exports.getUuid = async (req, res) => {
  const uuid = await chatService.getUuid();
  res.status(200);
  res.json({
    uuid: uuid,
  });
};
