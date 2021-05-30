const session = require("express-session");
const sessionOptions = {
  secret: "123",
  saveUninitialized: true,
  resave: true,
};

module.exports = (app) => {
  app.use(session(sessionOptions));
};
