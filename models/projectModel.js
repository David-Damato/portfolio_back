const connection = require("../db-config");
const db = connection.promise();

const findProject = () => {
  return db.query("SELECT * from projects").then(([result]) => result);
};

const findOne = (id) => {
  return db
    .query("SELECT * FROM projects WHERE id = ?", [id])
    .then(([results]) => results[0]);
};

const destroy = (id) => {
  return db
    .query("DELETE FROM projects WHERE id = ?", [id])
    .then(([result]) => result.affetedRows !== 0);
};

const update = (id, newData) => {
  return db.query("UPDATE projects SET ? WHERE id = ?", [newData, id]);
};

const createNewProject = ({ name, description, image, link }) => {
  return db
    .query(
      "INSERT INTO projects (name, description, image, link) VALUES (?, ?, ?, ?)",
      [name, description, image, link]
    )
    .then(([result]) => {
      const id = result.insertId;
      return { id, name, description, image, link };
    });
};

module.exports = {
  findProject,
  findOne,
  update,
  destroy,
  createNewProject,
};
