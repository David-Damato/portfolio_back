const projectRouter = require("express").Router();
const Project = require("../models/projectModel");

projectRouter.get("/", (req, res) => {
  Project.findProject()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving projects from DB");
    });
});

projectRouter.get("/:id", (req, res) => {
  Project.findOne(req.params.id)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching an project");
    });
});

projectRouter.delete("/:id", (req, res) => {
  Project.destroy(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send("Project deleted !");
      else res.status(404).send("project not found");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting a project");
    });
});

projectRouter.put("/:id", (req, res) => {
  let existingProject = null;
  Project.findOne(req.params.id)
    .then((project) => {
      existingProject = project;
      if (!existingProject) return Promise.reject("PROJECT_NOT_FOUND");
      return Project.update(req.params.id, req.body);
    })
    .then(() => {
      res.status(200).json({ ...existingProject, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === "PROJECT_NOT_FOUND")
        res.status(404).send(`Project with id ${req.params.id} not found.`);
      else res.status(500).send("Error updating the project");
    });
});

module.exports = projectRouter;
