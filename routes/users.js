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

usersRouter.post("/", (req, res) => {
  let { email } = req.body;
  User.findByEmail(email)
    .then((existingUserWithEmail) => {
      if (existingUserWithEmail)
        return Promise.reject(res.status(409).send("DUPLICATE_EMAIL"));
      return User.create(req.body);
    })
    .then((createdUser) => {
      return res.status(201).json(createdUser);
    })
    .catch((err) => {
      console.error(err);
      if (err === "DUPLICATE_EMAIL")
        res.status(409).json({ message: "This email is already used" });
      else res.status(500).send("Error saving the user");
    });
});

module.exports = usersRouter;
