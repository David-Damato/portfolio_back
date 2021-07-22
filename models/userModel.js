/* eslint-disable camelcase */
const argon2 = require("argon2");
const connection = require("../db-config");

const db = connection.promise();

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

const create = ({ email, password }) => {
  return hashPassword(password).then((hashedPassword) => {
    return db
      .query("INSERT INTO admin SET ?", {
        email,
        hashedPassword,
      })
      .then(([result]) => {
        const id = result.insertId;
        return { email, id };
      });
  });
};

const findByEmail = (email) => {
  return db
    .query("SELECT * FROM admin WHERE email = ?", [email])
    .then(([results]) => results[0]);
};

module.exports = {
  hashPassword,
  verifyPassword,
  create,
  findByEmail,
};
