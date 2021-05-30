const userRepository = require("../dbal/userRepository");

module.exports = (app) => {
  app.use(async (req, res, next) => {
    if (req.session.userId) {
      req.user = await userRepository.findById(req.session.userId);
    }
    next();
  });
};
