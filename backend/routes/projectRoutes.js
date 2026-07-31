const express = require("express");

const router = express.Router();


const {
  createProject,
  getProjects,
  deleteProject
} = require("../controllers/projectController");


const authMiddleware = require("../middleware/authMiddleware");



// ===============================
// GET ALL USER PROJECTS
// ===============================

router.get(
  "/",
  authMiddleware,
  getProjects
);




// ===============================
// CREATE NEW PROJECT
// ===============================

router.post(
  "/",
  authMiddleware,
  createProject
);




// ===============================
// DELETE PROJECT
// ===============================

router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);



module.exports = router;