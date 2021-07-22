const resumeRouter = require("express").Router();
const Food = require("../models/resumeModel");

resumeRouter.get("/", (req, res) => {
  Food.findResume()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving resume from DB");
    });
});

resumeRouter.get("/:id", (req, res) => {
  Food.findOne(req.params.id)
    .then((aliment) => {
      res.json(aliment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching an resume");
    });
});

module.exports = resumeRouter;
