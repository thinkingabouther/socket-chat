const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const chatController = require("../controllers/chatController");

module.exports = (app) => {
  app.route("/api/auth/login").post(authController.login);
  app.route("/api/auth/logout").delete(authController.logout);
  app.route("/api/auth/me").get(authController.me);

  app.route("/api/user/add-friend").post(userController.addFriend);
  app.route("/api/user/friends").get(userController.getFriends);
  app.route("/api/user/friends/:chatId").get(userController.getFriend);

  app.route("/api/chat/uuid").get(chatController.getUuid)
};
