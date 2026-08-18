const { db } = require("../config/firebase");

// ======================================================
// USER PROFILE
// ======================================================

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
    console.error("Update user profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user profile",
      error: error.message,
    });
  }
};


// ======================================================
// PROJECTS
// ======================================================

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
        message: "Project title and technologies are required",
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


const deleteProject = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { projectId } = req.params;

    const projectRef = db
      .collection("users")
      .doc(uid)
      .collection("projects")
      .doc(projectId);

    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await projectRef.delete();

    return res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};


// ======================================================
// SKILLS
// ======================================================

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


const deleteSkill = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { skillId } = req.params;

    const skillRef = db
      .collection("users")
      .doc(uid)
      .collection("skills")
      .doc(skillId);

    const skillDoc = await skillRef.get();

    if (!skillDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    await skillRef.delete();

    return res.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: error.message,
    });
  }
};


// ======================================================
// TASKS
// ======================================================

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


const updateTask = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { taskId } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Completed must be true or false",
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
      updatedAt: new Date(),
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
    console.error("Update task error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};


const deleteTask = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { taskId } = req.params;

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

    await taskRef.delete();

    return res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};


// ======================================================
// CAREER ROADMAP
// ======================================================

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
    console.error("Get roadmap progress error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get roadmap progress",
      error: error.message,
    });
  }
};


const saveRoadmapProgress = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { progress } = req.body;

    if (!progress) {
      return res.status(400).json({
        success: false,
        message: "Roadmap progress is required",
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
      message: "Roadmap progress saved successfully",
      progress,
    });
  } catch (error) {
    console.error("Save roadmap progress error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save roadmap progress",
      error: error.message,
    });
  }
};


// ======================================================
// WEEKLY GOALS
// ======================================================

const getWeeklyGoals = async (req, res) => {
  try {
    const uid = req.user.uid;

    const snapshot = await db
      .collection("users")
      .doc(uid)
      .collection("weeklyGoals")
      .get();

    const goals = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({
      success: true,
      goals,
    });
  } catch (error) {
    console.error("Get weekly goals error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get weekly goals",
      error: error.message,
    });
  }
};


const addWeeklyGoal = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Goal title is required",
      });
    }

    const goalData = {
      title: title.trim(),
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const goalRef = await db
      .collection("users")
      .doc(uid)
      .collection("weeklyGoals")
      .add(goalData);

    return res.status(201).json({
      success: true,
      message: "Weekly goal added successfully",
      goal: {
        id: goalRef.id,
        ...goalData,
      },
    });
  } catch (error) {
    console.error("Add weekly goal error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add weekly goal",
      error: error.message,
    });
  }
};


const updateWeeklyGoal = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { goalId } = req.params;
    const { title, progress } = req.body;

    const goalRef = db
      .collection("users")
      .doc(uid)
      .collection("weeklyGoals")
      .doc(goalId);

    const goalDoc = await goalRef.get();

    if (!goalDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Weekly goal not found",
      });
    }

    const updateData = {
      updatedAt: new Date(),
    };

    if (typeof title === "string" && title.trim()) {
      updateData.title = title.trim();
    }

    if (typeof progress === "number") {
      updateData.progress = Math.min(
        100,
        Math.max(0, progress)
      );
    }

    await goalRef.update(updateData);

    const updatedDoc = await goalRef.get();

    return res.json({
      success: true,
      message: "Weekly goal updated successfully",
      goal: {
        id: goalId,
        ...updatedDoc.data(),
      },
    });
  } catch (error) {
    console.error("Update weekly goal error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update weekly goal",
      error: error.message,
    });
  }
};


const deleteWeeklyGoal = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { goalId } = req.params;

    const goalRef = db
      .collection("users")
      .doc(uid)
      .collection("weeklyGoals")
      .doc(goalId);

    const goalDoc = await goalRef.get();

    if (!goalDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Weekly goal not found",
      });
    }

    await goalRef.delete();

    return res.json({
      success: true,
      message: "Weekly goal deleted successfully",
    });
  } catch (error) {
    console.error("Delete weekly goal error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete weekly goal",
      error: error.message,
    });
  }
};
// ======================================================
// RESUME ANALYZER
// ======================================================

const getResumeAnalysis = async (req, res) => {
  try {
    const uid = req.user.uid;

    const doc = await db
      .collection("users")
      .doc(uid)
      .collection("resume")
      .doc("analysis")
      .get();

    if (!doc.exists) {
      return res.json({
        success: true,
        analysis: null,
      });
    }

    return res.json({
      success: true,
      analysis: {
        id: doc.id,
        ...doc.data(),
      },
    });
  } catch (error) {
    console.error("Get resume analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get resume analysis",
      error: error.message,
    });
  }
};


const saveResumeAnalysis = async (req, res) => {
  try {
    const uid = req.user.uid;

    const {
      score,
      readiness,
      foundSkills,
      missingSkills,
      certifications,
      projects,
      tips,
    } = req.body;

    const resumeData = {
      score: typeof score === "number" ? score : 0,
      readiness: readiness || "",

      foundSkills: Array.isArray(foundSkills)
        ? foundSkills
        : [],

      missingSkills: Array.isArray(missingSkills)
        ? missingSkills
        : [],

      certifications: Array.isArray(certifications)
        ? certifications
        : [],

      projects: Array.isArray(projects)
        ? projects
        : [],

      tips: Array.isArray(tips)
        ? tips
        : [],

      analyzedAt: new Date(),
    };

    await db
      .collection("users")
      .doc(uid)
      .collection("resume")
      .doc("analysis")
      .set(resumeData);

    return res.json({
      success: true,
      message: "Resume analysis saved successfully",
      analysis: resumeData,
    });
  } catch (error) {
    console.error("Save resume analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save resume analysis",
      error: error.message,
    });
  }
};
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

  getWeeklyGoals,
  addWeeklyGoal,
  updateWeeklyGoal,
  deleteWeeklyGoal,
   getResumeAnalysis,
  saveResumeAnalysis,
  
};