
const express = require("express");

const {
  getUserProfile,
  updateUserProfile,
  getProjects,
  addProject,
  deleteProject,

  getSkills,
  addSkill,
  deleteSkill,

  getTasks,
  addTask,
  updateTask,
  deleteTask,

  getRoadmapProgress,
  saveRoadmapProgress,
} = require("../controllers/usercontroller");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// USER PROFILE
// ==========================================

router.get(
  "/profile",
  verifyToken,
  getUserProfile
);
router.put(
  "/profile",
  verifyToken,
  updateUserProfile
);

// ==========================================
// PROJECTS
// ==========================================

router.get(
  "/projects",
  verifyToken,
  getProjects
);

router.post(
  "/projects",
  verifyToken,
  addProject
);

router.delete(
  "/projects/:projectId",
  verifyToken,
  deleteProject
);

// ==========================================
// SKILLS
// ==========================================

router.get(
  "/skills",
  verifyToken,
  getSkills
);

router.post(
  "/skills",
  verifyToken,
  addSkill
);

router.delete(
  "/skills/:skillId",
  verifyToken,
  deleteSkill
);

// ==========================================
// TASKS
// ==========================================

router.get(
  "/tasks",
  verifyToken,
  getTasks
);

router.post(
  "/tasks",
  verifyToken,
  addTask
);

router.put(
  "/tasks/:taskId",
  verifyToken,
  updateTask
);

router.delete(
  "/tasks/:taskId",
  verifyToken,
  deleteTask
);

// ==========================================
// ROADMAP
// ==========================================

router.get(
  "/roadmap",
  verifyToken,
  getRoadmapProgress
);

router.put(
  "/roadmap",
  verifyToken,
  saveRoadmapProgress
);

module.exports = router;
