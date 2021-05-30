module.exports = (app) => {
  const insecureRoutes = ["/api/auth/login"];
  app.use(async (req, res, next) => {
    if (insecureRoutes.includes(req.path)) return next();
    if (!req.user) {
      res.status(403);
      res.json({
        message: "You have to login before accessing this action",
      });
      return;
    }
    return next();
  });
};
