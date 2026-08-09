function UpcomingTasks() {
  const tasks = [
    {
      title: "Complete React Hooks",
      due: "Today",
      status: "High Priority",
    },
    {
      title: "Build Portfolio Website",
      due: "Tomorrow",
      status: "Medium Priority",
    },
    {
      title: "Practice DSA",
      due: "Friday",
      status: "Low Priority",
    },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold mb-6">
        Upcoming Tasks
      </h2>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-lg p-4 hover:border hover:border-cyan-400 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-white">
                  {task.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  Due: {task.due}
                </p>
              </div>

              <span className="text-cyan-400 text-sm font-semibold">
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingTasks;