const authService = require("../services/authService");

exports.login = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  if (!token) {
    res.status(400);
    res.json({
      message: "Improper request!",
    });
    return;
  }
  const user = await authService.login(token);
  if (user instanceof Error) {
    res.status(500);
    res.json({
      message: "There was an error logging in!",
    });
  } else {
    req.session.userId = user._id;
    res.status(201);
    res.json(user);
  }
};

exports.logout = async (req, res) => {
  await req.session.destroy();
  res.status(200);
  res.json({
    message: "Logged out successfully",
  });
};

exports.me = async (req, res) => {
  res.status(200);
  res.json(req.user);
};
