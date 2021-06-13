const express = require("express");
const bodyparser = require("body-parser");
const sessionMiddleware = require("../middleware/sessionMiddleware");
const loginMiddleware = require("../middleware/loginMiddleware");
const checkLoginMiddleware = require("../middleware/checkLoginMiddleware");

const path = require("path");
const httpRoutes = require("./httpRoutes");

const app = express();

if (process.env.PROD) {
  app.use(express.static(path.join(__dirname, "../../client/build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });
  app.get("/room/:roomID", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });
  console.log("production!");
}

app.use(bodyparser.json({ limit: "50mb" }));
sessionMiddleware(app);
loginMiddleware(app);
checkLoginMiddleware(app);
httpRoutes(app);

module.exports = app;
