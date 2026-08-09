
const { db } = require("../config/firebase");

// ==========================================
// GET USER PROFILE
// ==========================================

const getUserProfile = async (req, res) => {
  try {
    const uid = req.user.uid;

    const doc = await db
      .collection("users")
      .doc(uid)
      .get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.json({
      success: true,
      user: {
        uid,
        ...doc.data(),
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user profile",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE USER PROFILE
// ==========================================

const updateUserProfile = async (req, res) => {
  try {
    const uid = req.user.uid;

    const {
      name,
      github,
      linkedin,
      bio,
    } = req.body;

    const userRef = db
      .collection("users")
      .doc(uid);

    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    const updateData = {
      name: name || "",
      github: github || "",
      linkedin: linkedin || "",
      bio: bio || "",
      updatedAt: new Date(),
    };

    await userRef.update(updateData);

    const updatedDoc = await userRef.get();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        uid,
        ...updatedDoc.data(),
      },
    });
  } catch (error) {
    console.error(
      "Update user profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update user profile",
      error: error.message,
    });
  }
};

// ==========================================
// GET PROJECTS
// ==========================================

const getProjects = async (req, res) => {
  try {
    const uid = req.user.uid;

    const snapshot = await db
      .collection("users")
      .doc(uid)
      .collection("projects")
      .get();

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get projects",
      error: error.message,
    });
  }
};

// ==========================================
// ADD PROJECT
// ==========================================

const addProject = async (req, res) => {
  try {
    const uid = req.user.uid;

    const {
      title,
      tech,
      github,
      demo,
      status,
    } = req.body;

    if (!title || !tech) {
      return res.status(400).json({
        success: false,
        message:
          "Project title and technologies are required",
      });
    }

    const projectData = {
      title,
      tech,
      github: github || "",
      demo: demo || "",
      status: status || "Completed",
      createdAt: new Date(),
    };

    const projectRef = await db
      .collection("users")
      .doc(uid)
      .collection("projects")
      .add(projectData);

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      project: {
        id: projectRef.id,
        ...projectData,
      },
    });
  } catch (error) {
    console.error("Add project error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add project",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE PROJECT
// ==========================================

const deleteProject = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { projectId } = req.params;

    await db
      .collection("users")
      .doc(uid)
      .collection("projects")
      .doc(projectId)
      .delete();

    return res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete project error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

// ==========================================
// GET SKILLS
// ==========================================

const getSkills = async (req, res) => {
  try {
    const uid = req.user.uid;

    const snapshot = await db
      .collection("users")
      .doc(uid)
      .collection("skills")
      .get();

    const skills = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({
      success: true,
      skills,
    });
  } catch (error) {
    console.error("Get skills error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get skills",
      error: error.message,
    });
  }
};

// ==========================================
// ADD SKILL
// ==========================================

const addSkill = async (req, res) => {
  try {
    const uid = req.user.uid;

    const {
      name,
      level,
      status,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    const skillData = {
      name,
      level: level || "Beginner",
      status: status || "Learning",
      createdAt: new Date(),
    };

    const skillRef = await db
      .collection("users")
      .doc(uid)
      .collection("skills")
      .add(skillData);

    return res.status(201).json({
      success: true,
      message: "Skill added successfully",
      skill: {
        id: skillRef.id,
        ...skillData,
      },
    });
  } catch (error) {
    console.error("Add skill error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add skill",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE SKILL
// ==========================================

const deleteSkill = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { skillId } = req.params;

    await db
      .collection("users")
      .doc(uid)
      .collection("skills")
      .doc(skillId)
      .delete();

    return res.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete skill error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: error.message,
    });
  }
};

// ==========================================
// GET ROADMAP PROGRESS
// ==========================================

const getRoadmapProgress = async (req, res) => {
  try {
    const uid = req.user.uid;

    const doc = await db
      .collection("users")
      .doc(uid)
      .collection("roadmap")
      .doc("progress")
      .get();

    if (!doc.exists) {
      return res.json({
        success: true,
        progress: {},
      });
    }

    return res.json({
      success: true,
      progress: doc.data().progress || {},
    });
  } catch (error) {
    console.error(
      "Get roadmap progress error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to get roadmap progress",
      error: error.message,
    });
  }
};

// ==========================================
// SAVE ROADMAP PROGRESS
// ==========================================

const saveRoadmapProgress = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { progress } = req.body;

    if (!progress) {
      return res.status(400).json({
        success: false,
        message:
          "Roadmap progress is required",
      });
    }

    await db
      .collection("users")
      .doc(uid)
      .collection("roadmap")
      .doc("progress")
      .set({
        progress,
        updatedAt: new Date(),
      });

    return res.json({
      success: true,
      message:
        "Roadmap progress saved successfully",
      progress,
    });
  } catch (error) {
    console.error(
      "Save roadmap progress error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to save roadmap progress",
      error: error.message,
    });
  }
};

// ==========================================
// GET TASKS
// ==========================================

const getTasks = async (req, res) => {
  try {
    const uid = req.user.uid;

    const snapshot = await db
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get tasks",
      error: error.message,
    });
  }
};

// ==========================================
// ADD TASK
// ==========================================

const addTask = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const taskData = {
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    };

    const taskRef = await db
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .add(taskData);

    return res.status(201).json({
      success: true,
      message: "Task added successfully",
      task: {
        id: taskRef.id,
        ...taskData,
      },
    });
  } catch (error) {
    console.error("Add task error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add task",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE TASK
// ==========================================

const updateTask = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { taskId } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message:
          "Completed must be true or false",
      });
    }

    const taskRef = db
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .doc(taskId);

    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await taskRef.update({
      completed,
    });

    return res.json({
      success: true,
      message: "Task updated successfully",
      task: {
        id: taskId,
        ...taskDoc.data(),
        completed,
      },
    });
  } catch (error) {
    console.error(
      "Update task error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE TASK
// ==========================================

const deleteTask = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { taskId } = req.params;

    await db
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .doc(taskId)
      .delete();

    return res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete task error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
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
};

