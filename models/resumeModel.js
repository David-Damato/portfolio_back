const connection = require("../db-config");
const db = connection.promise();

const findResume = () => {
  return db.query("SELECT * from resume").then(([result]) => result);
};

const findOne = (id) => {
  return db
    .query("SELECT * FROM resume WHERE id = ?", [id])
    .then(([results]) => results[0]);
};

module.exports = {
  findResume,
  findOne,
};
