
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import ProgressChart from "../../components/Dashboard/ProgressChart";
import TaskManager from "../../components/Dashboard/TaskManager";
import AchievementCards from "../../components/Dashboard/AchievementCards";
import WelcomeBanner from "../../components/Dashboard/WelcomeBanner";
import WeeklyGoals from "../../components/Dashboard/WeeklyGoals";

function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);

  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    resumeScore: 82,
    tasks: 0,
  });

  // ==========================================
  // LOAD ALL DASHBOARD DATA
  // ==========================================

  const loadDashboardData = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.log("❌ No logged-in user found");
        return;
      }

      console.log("🔵 Loading dashboard data...");

      const idToken = await user.getIdToken();

      // ==========================================
      // 1. USER PROFILE
      // ==========================================

      const profileResponse = await fetch(
        "https://pathforge-4-iwk7.onrender.com/api/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(
          profileData.message || "Failed to load profile"
        );
      }

      console.log(
        "Dashboard user profile:",
        profileData
      );

      setUserProfile(profileData.user);

      // ==========================================
      // 2. PROJECTS
      // ==========================================

      const projectsResponse = await fetch(
        "https://pathforge-4-iwk7.onrender.com/api/user/projects",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const projectsData =
        await projectsResponse.json();

      if (!projectsResponse.ok) {
        throw new Error(
          projectsData.message ||
            "Failed to load projects"
        );
      }

      console.log(
        "Dashboard projects:",
        projectsData
      );

      const projectCount =
        projectsData.projects?.length || 0;

      // ==========================================
      // 3. SKILLS
      // ==========================================

      const skillsResponse = await fetch(
        "https://pathforge-4-iwk7.onrender.com/api/user/skills",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const skillsData =
        await skillsResponse.json();

      if (!skillsResponse.ok) {
        throw new Error(
          skillsData.message ||
            "Failed to load skills"
        );
      }

      console.log(
        "Dashboard skills:",
        skillsData
      );

      const skillCount =
        skillsData.skills?.length || 0;

      // ==========================================
      // 4. TASKS
      // ==========================================

      const tasksResponse = await fetch(
        "https://pathforge-4-iwk7.onrender.com/api/user/tasks",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const tasksData =
        await tasksResponse.json();

      if (!tasksResponse.ok) {
        throw new Error(
          tasksData.message ||
            "Failed to load tasks"
        );
      }

      console.log(
        "Dashboard tasks:",
        tasksData
      );

      const taskCount =
        tasksData.tasks?.length || 0;

      // ==========================================
      // 5. RESUME SCORE
      // ==========================================

      const resume =
        JSON.parse(
          localStorage.getItem("resume")
        ) || {};

      const resumeScore =
        resume.score || 82;

      // ==========================================
      // 6. UPDATE STATS
      // ==========================================

      const finalStats = {
        projects: projectCount,
        skills: skillCount,
        resumeScore,
        tasks: taskCount,
      };

      console.log(
        "Final dashboard stats:",
        finalStats
      );

      setStats(finalStats);
    } catch (error) {
      console.error(
        "❌ Dashboard data error:",
        error
      );
    }
  };

  // ==========================================
  // LOAD DASHBOARD ON START
  // ==========================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  // ==========================================
  // WHEN TASK MANAGER CHANGES
  // RELOAD DASHBOARD STATS
  // ==========================================

  const handleTasksChanged = () => {
    console.log(
      "🔄 Task changed - refreshing dashboard stats"
    );

    loadDashboardData();
  };

  // ==========================================
  // DASHBOARD STATS
  // ==========================================

  const dashboardStats = [
    {
      title: "Resume Score",
      value: `${stats.resumeScore}%`,
      description: "Your current resume strength",
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      icon: "📄",
    },
    {
      title: "Projects",
      value: stats.projects,
      description: "Projects completed",
      color: "text-green-400",
      border: "border-green-500/30",
      icon: "🚀",
    },
    {
      title: "Skills",
      value: stats.skills,
      description: "Skills you're building",
      color: "text-yellow-400",
      border: "border-yellow-500/30",
      icon: "⚡",
    },
    {
      title: "Tasks",
      value: stats.tasks,
      description: "Tasks in your workspace",
      color: "text-pink-400",
      border: "border-pink-500/30",
      icon: "✅",
    },
  ];

  // ==========================================
  // QUICK ACTIONS
  // ==========================================

  const actions = [
    {
      title: "Resume Analyzer",
      description: "Analyze and improve your resume",
      path: "/dashboard/resume",
      icon: "📄",
    },
    {
      title: "Career Roadmap",
      description: "Build your personalized career path",
      path: "/dashboard/roadmap",
      icon: "🗺️",
    },
    {
      title: "Skills",
      description: "Track and improve your skills",
      path: "/dashboard/skills",
      icon: "⚡",
    },
    {
      title: "Projects",
      description: "Manage your projects",
      path: "/dashboard/projects",
      icon: "🚀",
    },
    {
      title: "Profile",
      description: "Update your personal information",
      path: "/dashboard/profile",
      icon: "👤",
    },
    {
      title: "Settings",
      description: "Manage your account settings",
      path: "/dashboard/settings",
      icon: "⚙️",
    },
    {
      title: "AI Interview",
      description: "Practice for your next interview",
      path: "/dashboard/interview",
      icon: "🎤",
    },
  ];

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen text-white">

      {/* ==========================================
          WELCOME SECTION
      ========================================== */}

      <div className="mb-8">
        <p className="text-cyan-400 text-sm font-semibold mb-2">
          PATHFORGE DASHBOARD
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Welcome back
          {userProfile?.name
            ? `, ${userProfile.name}`
            : ""}{" "}
          
        </h1>

        {userProfile?.email && (
          <p className="text-gray-400 mt-2">
            {userProfile.email}
          </p>
        )}

        <p className="text-gray-500 mt-3">
          Track your progress, build your skills,
          and move closer to your career goals.
        </p>
      </div>

      {/* ==========================================
          WELCOME BANNER
      ========================================== */}

      <div className="mb-8">
        <WelcomeBanner />
      </div>

      {/* ==========================================
          STATS
      ========================================== */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5 mb-10">

        {dashboardStats.map((item) => (
          <div
            key={item.title}
            className={`bg-slate-900/80 border ${item.border} rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >

            <div className="flex items-center justify-between">

              <div
                className={`w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-xl`}
              >
                {item.icon}
              </div>

              <div
                className={`w-2.5 h-2.5 rounded-full ${item.color.replace(
                  "text-",
                  "bg-"
                )}`}
              />
            </div>

            <h2 className="text-sm font-medium text-gray-400 mt-5">
              {item.title}
            </h2>

            <p
              className={`text-4xl font-bold mt-2 ${item.color}`}
            >
              {item.value}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {item.description}
            </p>

          </div>
        ))}

      </div>

      {/* ==========================================
          PROGRESS
      ========================================== */}

      <div className="mb-10">
        <ProgressChart />
      </div>

      {/* ==========================================
          TASK MANAGER
      ========================================== */}

      <div className="mb-10">
        <TaskManager
          onTasksChanged={handleTasksChanged}
        />
      </div>

      {/* ==========================================
          ACHIEVEMENTS
      ========================================== */}

      <div className="mb-10">
        <AchievementCards />
      </div>

      {/* ==========================================
          WEEKLY GOALS
      ========================================== */}

      <div className="mb-10">
        <WeeklyGoals />
      </div>

      {/* ==========================================
          QUICK ACTIONS
      ========================================== */}

      <div className="mt-12">

        <div className="mb-6">
          <p className="text-cyan-400 text-sm font-semibold">
            EXPLORE PATHFORGE
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Quick Actions
          </h2>

          <p className="text-gray-500 mt-2">
            Jump directly to the tools you need.
          </p>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-5">

          {actions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="group bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-start justify-between">

                <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-cyan-500/10 flex items-center justify-center text-2xl transition">
                  {action.icon}
                </div>

                <span className="text-gray-600 group-hover:text-cyan-400 text-xl transition">
                  →
                </span>

              </div>

              <h3 className="text-lg font-semibold text-white mt-5 group-hover:text-cyan-400 transition">
                {action.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {action.description}
              </p>

            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;

