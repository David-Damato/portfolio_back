const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const db = require('../db-config');
const checkAuthFields = require('../middlewares/checkFields');
const checkJwt = require('../middlewares/checkJwt');

const loginRouter = require('express').Router();
const isProduction = process.env.NODE_ENV === 'production';

require('dotenv').config();

loginRouter.post('/', checkAuthFields, (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM User WHERE email = ?', email, (err, results) => {
    const [user] = results;

    User.verifyPassword(password, user.HashedPassword, err)
      .then((passwordIsCorrect) => {
        if (err) {
          console.log(err.message);
        }
        if (!passwordIsCorrect) {
          res.status(400).json({
            errors: 'invalid password',
          });
        } else {
          const { idUser } = user;
          const payload = { idUser, email };
          const privateKey = process.env.JWT_SECRET;

          jwt.sign({ payload }, privateKey, (jwterr, token) => {
            if (jwterr) {
              return res.status(500).json({
                errors: [jwterr.message],
              });
            }
            const options = {
              httpOnly: true,
              expiresIn: '1h',
              secure: isProduction,
            };
            res.cookie('jwt', token, options);
            res.json({ payload });
          });
        }
      })
      .catch((err) => console.log(err));
  });
});

loginRouter.get('/check', checkJwt, (req, res) => {
  res.json(req.user);
});

module.exports = loginRouter;
