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

const destroy = (id) => {
  return db
    .query("DELETE FROM User WHERE idUser = ?", [id])
    .then(([result]) => result.affetedRows !== 0);
};

const update = (id, newData) => {
  return db.query("UPDATE User SET ? WHERE idUser = ?", [newData, id]);
};

const findOne = (id) => {
  return db
    .query("SELECT * FROM User WHERE idUser = ?", [id])
    .then(([results]) => results[0]);
};

const findAll = () => {
  return db.query("SELECT * FROM User").then(([results]) => results);
};

module.exports = {
  update,
  destroy,
  findAll,
  findOne,
  hashPassword,
  verifyPassword,
};
