
function TaskManager() {
  console.log("🚨🚨🚨 TASK MANAGER IS RUNNING 🚨🚨🚨");

  return (
    <div className="bg-slate-900 p-6 mt-6 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        TASK MANAGER TEST
      </h2>

      <p className="text-cyan-400">
        If you can see this, TaskManager.jsx is being rendered.
      </p>

      <button
        onClick={() => {
          console.log("🚨 TEST BUTTON CLICKED 🚨");
          alert("TaskManager button works!");
        }}
        className="mt-4 bg-cyan-400 text-black px-6 py-3 rounded-lg"
      >
        TEST BUTTON
      </button>
    </div>
  );
}

export default TaskManager;

