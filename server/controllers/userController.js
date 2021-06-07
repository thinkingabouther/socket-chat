const userService = require("../services/userService");

exports.addFriend = async (req, res) => {
  if (req.body.email === "") {
    res.status(400);
    res.json({
      message: "Email cannot be empty!",
    });
    return;
  }

  try {
    await userService.addFriend(req.user, req.body.email);
  } catch (e) {
    res.status(400);
    res.json({
      message: e.message,
    });
    return;
  }

  res.status(201);
  res.json({
    message: "Connection successfully created!",
  });
};

exports.getFriends = async (req, res) => {
  const result = await userService.findFriends(req.user);
  res.status(200);
  res.json(result);
};

exports.getFriend = async (req, res) => {
  const result = await userService.findFriend(req.user, req.params['chatId'])
  if (result === null) {
    res.status(404);
    res.json()
    return
  }
  res.status(200)
  res.json(result)
}
