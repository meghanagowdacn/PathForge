import { useState, useEffect } from "react";
import { roadmaps } from "./roadmapData";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_URL = "https://pathforge-4-iwk7.onrender.com";

function CareerRoadmap() {
  const [selected, setSelected] = useState("frontend");
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);

  // ==========================================
  // WATCH FIREBASE LOGIN
  // ==========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);

        if (!currentUser) {
          setCompleted({});
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // ==========================================
  // LOAD ROADMAP FROM FIRESTORE
  // ==========================================

  useEffect(() => {
    const loadProgress = async () => {
      if (!user) {
        return;
      }

      try {
        setLoading(true);

        const token = await user.getIdToken();

        const response = await fetch(
          `${API_URL}/api/user/roadmap`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log(
          "📥 Roadmap loaded from Firebase:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load roadmap progress"
          );
        }

        setCompleted(data.progress || {});
      } catch (error) {
        console.error(
          "❌ Failed to load roadmap:",
          error
        );

        setCompleted({});
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  // ==========================================
  // SAVE ROADMAP TO FIRESTORE
  // ==========================================

  useEffect(() => {
    const saveProgress = async () => {
      // IMPORTANT:
      // Do not save while Firebase data is loading.
      if (!user || loading) {
        return;
      }

      try {
        setSaving(true);

        const token = await user.getIdToken();

        const response = await fetch(
          `${API_URL}/api/user/roadmap`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              progress: completed,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to save roadmap progress"
          );
        }

        console.log(
          "💾 Roadmap saved to Firebase:",
          data
        );
      } catch (error) {
        console.error(
          "❌ Failed to save roadmap:",
          error
        );
      } finally {
        setSaving(false);
      }
    };

    saveProgress();
  }, [completed, user, loading]);

  // ==========================================
  // TOGGLE SKILL
  // ==========================================

  const toggleSkill = (skill) => {
    setCompleted((previous) => ({
      ...previous,

      [selected]: {
        ...previous[selected],

        [skill]:
          !previous[selected]?.[skill],
      },
    }));
  };

  // ==========================================
  // CURRENT ROADMAP
  // ==========================================

  const skills = roadmaps[selected] || [];

  const completedCount = skills.filter(
    (skill) =>
      completed[selected]?.[skill]
  ).length;

  const progress =
    skills.length > 0
      ? Math.round(
          (completedCount / skills.length) *
            100
        )
      : 0;

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="p-8">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          Career Roadmap
        </h1>

        <div className="bg-slate-900 rounded-xl p-6">

          <p className="text-gray-400">
            Loading roadmap progress...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // NO USER
  // ==========================================

  if (!user) {
    return (
      <div className="p-8">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          Career Roadmap
        </h1>

        <div className="bg-slate-900 rounded-xl p-6">

          <p className="text-gray-400">
            Please log in to view your roadmap.
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="p-8">

      {/* TITLE */}

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Career Roadmap
      </h1>

      {/* SAVE STATUS */}

      {saving && (
        <p className="text-xs text-gray-500 mb-4">
          Saving progress...
        </p>
      )}

      {/* TABS */}

      <div className="flex flex-wrap gap-4 mb-10">

        <button
          onClick={() =>
            setSelected("frontend")
          }
          className={`px-6 py-3 rounded-lg transition ${
            selected === "frontend"
              ? "bg-cyan-500 text-black"
              : "bg-slate-800 hover:bg-cyan-500"
          }`}
        >
          Frontend
        </button>

        <button
          onClick={() =>
            setSelected("backend")
          }
          className={`px-6 py-3 rounded-lg transition ${
            selected === "backend"
              ? "bg-cyan-500 text-black"
              : "bg-slate-800 hover:bg-cyan-500"
          }`}
        >
          Backend
        </button>

        <button
          onClick={() =>
            setSelected("aiml")
          }
          className={`px-6 py-3 rounded-lg transition ${
            selected === "aiml"
              ? "bg-cyan-500 text-black"
              : "bg-slate-800 hover:bg-cyan-500"
          }`}
        >
          AI / ML
        </button>

        <button
          onClick={() =>
            setSelected("cybersecurity")
          }
          className={`px-6 py-3 rounded-lg transition ${
            selected === "cybersecurity"
              ? "bg-cyan-500 text-black"
              : "bg-slate-800 hover:bg-cyan-500"
          }`}
        >
          Cyber Security
        </button>

        <button
          onClick={() =>
            setSelected("dataanalyst")
          }
          className={`px-6 py-3 rounded-lg transition ${
            selected === "dataanalyst"
              ? "bg-cyan-500 text-black"
              : "bg-slate-800 hover:bg-cyan-500"
          }`}
        >
          Data Analyst
        </button>

      </div>

      {/* PROGRESS */}

      <div className="bg-slate-900 rounded-xl p-6 mb-8">

        <div className="flex justify-between mb-3">

          <h2 className="text-xl font-bold">
            Progress
          </h2>

          <span className="text-cyan-400 font-bold">
            {progress}%
          </span>

        </div>

        <div className="w-full bg-slate-700 h-3 rounded-full">

          <div
            className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="text-gray-400 text-sm mt-3">
          {completedCount} of{" "}
          {skills.length} skills completed
        </p>

      </div>

      {/* SKILLS */}

      <div className="grid md:grid-cols-2 gap-6">

        {skills.map((skill, index) => {

          const done =
            completed[selected]?.[skill] ||
            false;

          const unlocked =
            index === 0 ||
            completed[selected]?.[
              skills[index - 1]
            ];

          return (
            <div
              key={skill}
              className={`bg-slate-900 rounded-xl p-5 flex justify-between items-center transition ${
                !unlocked
                  ? "opacity-50"
                  : "hover:bg-slate-800"
              }`}
            >

              <div>

                <h3 className="text-lg font-semibold">
                  {skill}
                </h3>

                {!unlocked && (
                  <p className="text-sm text-gray-400 mt-1">
                    🔒 Complete "
                    {skills[index - 1]}"
                    {" "}to unlock
                  </p>
                )}

                {done && (
                  <p className="text-sm text-green-400 mt-1">
                    ✓ Completed
                  </p>
                )}

              </div>

              <input
                type="checkbox"
                checked={done}
                disabled={!unlocked}
                onChange={() =>
                  toggleSkill(skill)
                }
                className="w-5 h-5 accent-cyan-400 cursor-pointer"
              />

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default CareerRoadmap;