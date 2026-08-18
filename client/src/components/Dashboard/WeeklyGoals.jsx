import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

const API_URL = "https://pathforge-4-iwk7.onrender.com";

function WeeklyGoals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // LOAD GOALS FROM FIRESTORE
  // ==========================================

  const loadGoals = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.log("No logged-in user");
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();

      const response = await fetch(
        `${API_URL}/api/user/weekly-goals`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Weekly goals loaded:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load weekly goals"
        );
      }

      setGoals(data.goals || []);
    } catch (error) {
      console.error("Load weekly goals error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  // ==========================================
  // ADD GOAL
  // ==========================================

  const addGoal = async () => {
    if (!newGoal.trim() || saving) {
      return;
    }

    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const token = await user.getIdToken();

      const response = await fetch(
        `${API_URL}/api/user/weekly-goals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newGoal.trim(),
            progress: 0,
          }),
        }
      );

      const data = await response.json();

      console.log("Weekly goal added:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add weekly goal"
        );
      }

      // Firestore-created goal
      setGoals((previousGoals) => [
        ...previousGoals,
        data.goal,
      ]);

      setNewGoal("");

      alert("Weekly goal added successfully! ✅");
    } catch (error) {
      console.error("Add weekly goal error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // UPDATE PROGRESS
  // ==========================================

  const updateProgress = async (id, value) => {
    const progress = Number(value);

    // Update UI immediately
    setGoals((previousGoals) =>
      previousGoals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress,
            }
          : goal
      )
    );

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");

        // Reload correct Firebase data
        await loadGoals();

        return;
      }

      const token = await user.getIdToken();

      const response = await fetch(
        `${API_URL}/api/user/weekly-goals/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            progress,
          }),
        }
      );

      const data = await response.json();

      console.log("Weekly goal updated:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update goal"
        );
      }
    } catch (error) {
      console.error("Update weekly goal error:", error);

      alert(error.message);

      // Get original data back from Firestore
      await loadGoals();
    }
  };

  // ==========================================
  // DELETE GOAL
  // ==========================================

  const deleteGoal = async (id) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const token = await user.getIdToken();

      const response = await fetch(
        `${API_URL}/api/user/weekly-goals/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Weekly goal deleted:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete goal"
        );
      }

      // Remove from screen after successful Firestore deletion
      setGoals((previousGoals) =>
        previousGoals.filter(
          (goal) => goal.id !== id
        )
      );

      alert("Weekly goal deleted successfully! ✅");
    } catch (error) {
      console.error("Delete weekly goal error:", error);
      alert(error.message);
    }
  };

  // ==========================================
  // STATISTICS
  // ==========================================

  const completedGoals = goals.filter(
    (goal) => Number(goal.progress || 0) === 100
  ).length;

  const averageProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce(
            (total, goal) =>
              total + Number(goal.progress || 0),
            0
          ) / goals.length
        )
      : 0;

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg mt-10">
        <p className="text-gray-400">
          Loading weekly goals...
        </p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg mt-10">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <p className="text-cyan-400 text-sm font-semibold">
            WEEKLY PLANNING
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            🎯 Weekly Goals
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Set goals, track your progress, and stay consistent.
          </p>
        </div>

        {/* SUMMARY */}

        <div className="flex gap-3">

          <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-center min-w-[80px]">
            <p className="text-xs text-gray-500">
              Goals
            </p>

            <p className="text-xl font-bold text-white">
              {goals.length}
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-center min-w-[80px]">
            <p className="text-xs text-gray-500">
              Done
            </p>

            <p className="text-xl font-bold text-green-400">
              {completedGoals}
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-center min-w-[80px]">
            <p className="text-xs text-gray-500">
              Average
            </p>

            <p className="text-xl font-bold text-cyan-400">
              {averageProgress}%
            </p>
          </div>

        </div>
      </div>

      {/* ADD GOAL */}

      <div className="flex flex-col sm:flex-row gap-3 mb-8">

        <input
          type="text"
          placeholder="What do you want to achieve this week?"
          value={newGoal}
          onChange={(e) =>
            setNewGoal(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addGoal();
            }
          }}
          className="flex-1 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 text-white placeholder:text-gray-500 px-4 py-3 outline-none transition"
        />

        <button
          type="button"
          onClick={addGoal}
          disabled={!newGoal.trim() || saving}
          className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold px-6 py-3 rounded-xl transition"
        >
          {saving ? "Adding..." : "+ Add Goal"}
        </button>

      </div>

      {/* GOALS */}

      {goals.length === 0 ? (

        <div className="border border-dashed border-slate-700 rounded-xl p-10 text-center">

          <div className="text-4xl mb-3">
            🎯
          </div>

          <p className="text-gray-300 font-medium">
            No weekly goals yet
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Add your first goal above.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {goals.map((goal) => (

            <div
              key={goal.id}
              className="bg-slate-800/60 border border-slate-700 hover:border-cyan-500/30 rounded-xl p-5 transition"
            >

              {/* GOAL HEADER */}

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3 min-w-0">

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      Number(goal.progress || 0) === 100
                        ? "bg-green-500/10"
                        : "bg-cyan-500/10"
                    }`}
                  >
                    {Number(goal.progress || 0) === 100
                      ? "✓"
                      : "🎯"}
                  </div>

                  <div className="min-w-0">

                    <h3
                      className={`font-semibold break-words ${
                        Number(goal.progress || 0) === 100
                          ? "text-gray-400 line-through"
                          : "text-white"
                      }`}
                    >
                      {goal.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {Number(goal.progress || 0) === 100
                        ? "Goal completed"
                        : "Keep pushing forward"}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3 shrink-0">

                  <span className="text-cyan-400 font-bold">
                    {Number(goal.progress || 0)}%
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      deleteGoal(goal.id)
                    }
                    className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg px-2 py-1 transition"
                    title="Delete goal"
                  >
                    🗑️
                  </button>

                </div>

              </div>

              {/* PROGRESS BAR */}

              <div className="mt-5">

                <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">

                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      Number(goal.progress || 0) === 100
                        ? "bg-green-400"
                        : "bg-cyan-400"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          Number(goal.progress || 0)
                        )
                      )}%`,
                    }}
                  />

                </div>

              </div>

              {/* SLIDER */}

              <div className="flex items-center gap-4 mt-4">

                <span className="text-xs text-gray-500">
                  0%
                </span>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Number(
                    goal.progress || 0
                  )}
                  onChange={(e) =>
                    updateProgress(
                      goal.id,
                      e.target.value
                    )
                  }
                  className="flex-1 accent-cyan-400 cursor-pointer"
                />

                <span className="text-xs text-gray-500">
                  100%
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default WeeklyGoals;