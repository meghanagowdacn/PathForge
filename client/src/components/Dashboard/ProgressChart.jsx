
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { auth } from "../../firebase/firebase";

function ProgressChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD REAL PROGRESS
  // ==========================================

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          console.log(
            "No logged-in user found for ProgressChart"
          );
          setLoading(false);
          return;
        }

        const token = await user.getIdToken();

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // ==========================================
        // LOAD PROJECTS
        // ==========================================

        const projectsResponse = await fetch(
          "https://pathforge-4-iwk7.onrender.com/api/user/projects",
          {
            method: "GET",
            headers,
          }
        );

        const projectsData =
          await projectsResponse.json();

        // ==========================================
        // LOAD SKILLS
        // ==========================================

        const skillsResponse = await fetch(
          "https://pathforge-4-iwk7.onrender.com/api/user/skills",
          {
            method: "GET",
            headers,
          }
        );

        const skillsData =
          await skillsResponse.json();

        // ==========================================
        // LOAD TASKS
        // ==========================================

        const tasksResponse = await fetch(
          "https://pathforge-4-iwk7.onrender.com/api/user/tasks",
          {
            method: "GET",
            headers,
          }
        );

        const tasksData =
          await tasksResponse.json();

        // ==========================================
        // LOAD ROADMAP
        // ==========================================

        const roadmapResponse = await fetch(
          "https://pathforge-4-iwk7.onrender.com/api/user/roadmap",
          {
            method: "GET",
            headers,
          }
        );

        const roadmapData =
          await roadmapResponse.json();

        // ==========================================
        // CHECK RESPONSES
        // ==========================================

        if (
          !projectsResponse.ok ||
          !skillsResponse.ok ||
          !tasksResponse.ok ||
          !roadmapResponse.ok
        ) {
          throw new Error(
            "Failed to load progress data"
          );
        }

        console.log(
          "ProgressChart projects:",
          projectsData
        );

        console.log(
          "ProgressChart skills:",
          skillsData
        );

        console.log(
          "ProgressChart tasks:",
          tasksData
        );

        console.log(
          "ProgressChart roadmap:",
          roadmapData
        );

        // ==========================================
        // CALCULATE TASK PROGRESS
        // ==========================================

        const tasks =
          tasksData.tasks || [];

        const completedTasks =
          tasks.filter(
            (task) => task.completed
          ).length;

        const taskProgress =
          tasks.length > 0
            ? Math.round(
                (completedTasks /
                  tasks.length) *
                  100
              )
            : 0;

        // ==========================================
        // CALCULATE SKILL PROGRESS
        // ==========================================

        const skills =
          skillsData.skills || [];

        const completedSkills =
          skills.filter(
            (skill) =>
              skill.status === "Completed" ||
              skill.completed === true
          ).length;

        const skillProgress =
          skills.length > 0
            ? Math.round(
                (completedSkills /
                  skills.length) *
                  100
              )
            : 0;

        // ==========================================
        // CALCULATE ROADMAP PROGRESS
        // ==========================================

        const roadmapProgress =
          roadmapData.progress || {};

        let roadmapTotal = 0;
        let roadmapCompleted = 0;

        Object.values(
          roadmapProgress
        ).forEach((roadmap) => {
          if (
            roadmap &&
            typeof roadmap === "object"
          ) {
            Object.values(roadmap).forEach(
              (value) => {
                roadmapTotal++;

                if (value === true) {
                  roadmapCompleted++;
                }
              }
            );
          }
        });

        const roadmapPercentage =
          roadmapTotal > 0
            ? Math.round(
                (roadmapCompleted /
                  roadmapTotal) *
                  100
              )
            : 0;

        // ==========================================
        // PROJECT PROGRESS
        // ==========================================

        const projects =
          projectsData.projects || [];

        const projectProgress =
          projects.length > 0
            ? Math.min(
                projects.length * 20,
                100
              )
            : 0;

        // ==========================================
        // CREATE CHART DATA
        // ==========================================

        const chartData = [
          {
            day: "Projects",
            progress: projectProgress,
          },
          {
            day: "Skills",
            progress: skillProgress,
          },
          {
            day: "Tasks",
            progress: taskProgress,
          },
          {
            day: "Roadmap",
            progress: roadmapPercentage,
          },
        ];

        setData(chartData);
      } catch (error) {
        console.error(
          "ProgressChart error:",
          error
        );

        setData([
          {
            day: "Projects",
            progress: 0,
          },
          {
            day: "Skills",
            progress: 0,
          },
          {
            day: "Tasks",
            progress: 0,
          },
          {
            day: "Roadmap",
            progress: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-white">
          Learning Progress
        </h2>

        <p className="text-gray-400 mt-4">
          Loading your progress...
        </p>
      </div>
    );
  }

  // ==========================================
  // CALCULATE OVERALL PROGRESS
  // ==========================================

  const overallProgress =
    data.length > 0
      ? Math.round(
          data.reduce(
            (total, item) =>
              total + item.progress,
            0
          ) / data.length
        )
      : 0;

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg mb-10">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <p className="text-cyan-400 text-sm font-semibold">
            YOUR DEVELOPMENT
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Learning Progress
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Track your progress across your
            PathForge journey.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 text-center">

          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Overall
          </p>

          <p className="text-2xl font-bold text-cyan-400">
            {overallProgress}%
          </p>

        </div>

      </div>

      {/* CHART */}

      <div className="w-full h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              stroke="#94a3b8"
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                `${value}%`
              }
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border:
                  "1px solid #334155",
                borderRadius: "12px",
                color: "#ffffff",
              }}
              labelStyle={{
                color: "#94a3b8",
                marginBottom: "4px",
              }}
              formatter={(value) => [
                `${value}%`,
                "Progress",
              ]}
            />

            <Line
              type="monotone"
              dataKey="progress"
              stroke="#06b6d4"
              strokeWidth={4}
              activeDot={{
                r: 7,
              }}
              dot={{
                r: 5,
                strokeWidth: 2,
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* PROGRESS SUMMARY */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

        {data.map((item) => (
          <div
            key={item.day}
            className="bg-slate-800/70 border border-slate-700 rounded-xl p-4"
          >

            <p className="text-sm text-gray-400">
              {item.day}
            </p>

            <div className="flex items-end justify-between mt-2">

              <p className="text-xl font-bold text-white">
                {item.progress}%
              </p>

              <span className="text-xs text-cyan-400">
                progress
              </span>

            </div>

            <div className="w-full h-1.5 bg-slate-700 rounded-full mt-3 overflow-hidden">

              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                style={{
                  width: `${item.progress}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ProgressChart;

