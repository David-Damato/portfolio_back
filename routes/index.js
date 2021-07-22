const resumeRouter = require("./resume");
const usersRouter = require("./users");
const projectRouter = require("./project");
const loginRouter = require("./login");

const setupRoutes = (app) => {
  app.use("/api/resume", resumeRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/project", projectRouter);
  app.use("/api/login", loginRouter);
};

module.exports = {
  setupRoutes,
};
