const usersRouter = require("express").Router();
const User = require("../models/userModel");

usersRouter.get("/", (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching an user");
    });
});

usersRouter.get("/:id", (req, res) => {
  User.findOneById(req.params.id)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching an user");
    });
});

module.exports = usersRouter;
