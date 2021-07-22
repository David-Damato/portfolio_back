const db = require("../db-config");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const checkAuthFields = require("../middlewares/checkFields");
const checkJwt = require("../middlewares/checkJwt");

const loginRouter = require("express").Router();
const isProduction = process.env.NODE_ENV === "production";

require("dotenv").config();

loginRouter.post("/", checkAuthFields, (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM admin WHERE email = ?", email, (err, results) => {
    const [user] = results;
    User.verifyPassword(password, user.hashedPassword, err)
      .then((passwordIsCorrect) => {
        if (err) {
          console.log(err.message);
        }
        if (!passwordIsCorrect) {
          res.status(400).json({
            errors: "invalid password",
          });
        } else {
          const { id } = user;
          const payload = { id, email };
          const privateKey = process.env.JWT_SECRET;

          jwt.sign({ payload }, "secret", (jwterr, token) => {
            console.log(jwterr);
            if (jwterr) {
              console.log(jwterr);
              return res.status(500).json({
                errors: [jwterr.message],
              });
            }
            const options = {
              httpOnly: true,
              expiresIn: "1h",
              secure: isProduction,
            };
            res.cookie("jwt", token, options);
            res.json({ payload });
          });
        }
      })
      .catch((err) => console.log(err));
  });
});

loginRouter.get("/check", checkJwt, (req, res) => {
  res.json(req.user);
});

module.exports = loginRouter;
