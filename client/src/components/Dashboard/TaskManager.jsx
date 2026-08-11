
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

function TaskManager({ onTasksChanged }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // LOAD TASKS
  // ==========================================

  const loadTasks = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.log("❌ No logged-in user");
        setLoading(false);
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch(
        "https://pathforge-4-iwk7.onrender.com/api/user/tasks",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();

      console.log("📥 Tasks loaded:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load tasks"
        );
      }

      setTasks(data.tasks || []);
    } catch (error) {
      console.error(
        "❌ Load tasks error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ==========================================
  // ADD TASK
  // ==========================================

  const addTask = async () => {
    if (!newTask.trim() || saving) {
      return;
    }

    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch(
        "https://pathforge-4-iwk7.onrender.com/api/user/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            title: newTask.trim(),
          }),
        }
      );

      const data = await response.json();

      console.log(
        "📦 Add task response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add task"
        );
      }

      setTasks((previousTasks) => [
        ...previousTasks,
        data.task,
      ]);

      setNewTask("");

      if (onTasksChanged) {
        onTasksChanged();
      }

      console.log(
        "✅ Task added successfully"
      );
    } catch (error) {
      console.error(
        "❌ Add task error:",
        error
      );

      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // TOGGLE TASK COMPLETION
  // ==========================================

  const toggleTask = async (task) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const newCompletedStatus =
        !task.completed;

      // Update UI immediately
      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item.id === task.id
            ? {
                ...item,
                completed:
                  newCompletedStatus,
              }
            : item
        )
      );

      const idToken =
        await user.getIdToken();

      const response = await fetch(
        `https://pathforge-4-iwk7.onrender.com/api/user/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            completed:
              newCompletedStatus,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "🔄 Update task response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update task"
        );
      }

      if (onTasksChanged) {
        onTasksChanged();
      }

      console.log(
        "✅ Task completion updated:",
        newCompletedStatus
      );
    } catch (error) {
      console.error(
        "❌ Update task error:",
        error
      );

      loadTasks();

      alert(error.message);
    }
  };

  // ==========================================
  // DELETE TASK
  // ==========================================

  const deleteTask = async (id) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const idToken =
        await user.getIdToken();

      const response = await fetch(
        `https://pathforge-4-iwk7.onrender.com/api/user/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data =
        await response.json();

      console.log(
        "🗑 Delete task response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete task"
        );
      }

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task.id !== id
        )
      );

      if (onTasksChanged) {
        onTasksChanged();
      }

      console.log(
        "✅ Task deleted"
      );
    } catch (error) {
      console.error(
        "❌ Delete task error:",
        error
      );

      alert(error.message);
    }
  };

  // ==========================================
  // TASK STATISTICS
  // ==========================================

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const remainingTasks =
    tasks.length - completedTasks;

  const completionPercentage =
    tasks.length > 0
      ? Math.round(
          (completedTasks /
            tasks.length) *
            100
        )
      : 0;

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white">
          Today's Tasks
        </h2>

        <p className="text-gray-400 mt-4">
          Loading your tasks...
        </p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <p className="text-cyan-400 text-sm font-semibold">
            DAILY PRODUCTIVITY
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Today's Tasks
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Stay focused and complete your
            daily goals.
          </p>
        </div>

        {/* TASK SUMMARY */}

        <div className="flex gap-3">

          <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-center">
            <p className="text-xs text-gray-500">
              Total
            </p>

            <p className="text-xl font-bold text-white">
              {tasks.length}
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-center">
            <p className="text-xs text-gray-500">
              Done
            </p>

            <p className="text-xl font-bold text-green-400">
              {completedTasks}
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-center">
            <p className="text-xs text-gray-500">
              Left
            </p>

            <p className="text-xl font-bold text-yellow-400">
              {remainingTasks}
            </p>
          </div>

        </div>

      </div>

      {/* PROGRESS */}

      <div className="mb-6">

        <div className="flex items-center justify-between mb-2">

          <span className="text-sm text-gray-400">
            Daily completion
          </span>

          <span className="text-sm font-semibold text-cyan-400">
            {completionPercentage}%
          </span>

        </div>

        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-cyan-400 rounded-full transition-all duration-500"
            style={{
              width: `${completionPercentage}%`,
            }}
          />

        </div>

      </div>

      {/* TASK LIST */}

      <div className="space-y-3">

        {tasks.length === 0 ? (
          <div className="border border-dashed border-slate-700 rounded-xl p-8 text-center">

            <div className="text-3xl mb-3">
              📝
            </div>

            <p className="text-gray-300 font-medium">
              No tasks added yet
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Add your first task below to
              get started.
            </p>

          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`group flex items-center justify-between gap-4 border rounded-xl p-4 transition-all duration-200 ${
                task.completed
                  ? "bg-slate-900/60 border-green-500/20"
                  : "bg-slate-800/60 border-slate-700 hover:border-cyan-500/30"
              }`}
            >

              <div className="flex items-center gap-4 min-w-0">

                {/* CHECKBOX */}

                <input
                  type="checkbox"
                  checked={
                    task.completed || false
                  }
                  onChange={() =>
                    toggleTask(task)
                  }
                  className="w-5 h-5 cursor-pointer accent-cyan-400 shrink-0"
                />

                {/* TASK TITLE */}

                <span
                  className={`break-words ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-200"
                  }`}
                >
                  {task.title}
                </span>

              </div>

              {/* DELETE */}

              <button
                type="button"
                onClick={() =>
                  deleteTask(task.id)
                }
                className="opacity-70 md:opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg px-3 py-2 transition shrink-0"
                title="Delete task"
              >
                🗑️
              </button>

            </div>
          ))
        )}

      </div>

      {/* ADD TASK */}

      <div className="flex flex-col sm:flex-row gap-3 mt-6">

        <input
          type="text"
          placeholder="What do you want to accomplish today?"
          value={newTask}
          onChange={(e) =>
            setNewTask(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          className="flex-1 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 px-4 py-3 outline-none text-white placeholder:text-gray-500 transition"
        />

        <button
          type="button"
          onClick={addTask}
          disabled={
            saving || !newTask.trim()
          }
          className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold px-6 py-3 rounded-xl transition"
        >
          {saving ? "Adding..." : "+ Add Task"}
        </button>

      </div>

    </div>
  );
}

export default TaskManager;
