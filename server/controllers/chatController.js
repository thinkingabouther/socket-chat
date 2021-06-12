const chatService = require("../services/chatService");

exports.getUuid = async (req, res) => {
  const uuid = await chatService.getUuid();
  res.status(200);
  res.json({
    uuid: uuid,
  });
};

exports.saveImage = async (req, res) => {
  const url = await chatService.saveImage(req.body.base64);
  if (!url) {
    console.log(url)
    res.status(500)
    res.json('internal error')
    return
  }
  res.status(201);
  res.json({
    url: url
  });
}
