function DailyGoal() {
  const completed = 3;
  const total = 5;
  const percentage = (completed / total) * 100;

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold mb-6">
        Daily Goal
      </h2>

      <div className="mb-4">
        <div className="flex justify-between text-gray-300 mb-2">
          <span>Tasks Completed</span>
          <span>{completed}/{total}</span>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-3">
          <div
            className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <p className="text-gray-400">
        Keep going! You're making great progress today.
      </p>
    </div>
  );
}

export default DailyGoal;