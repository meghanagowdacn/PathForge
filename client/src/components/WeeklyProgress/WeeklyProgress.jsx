function WeeklyProgress() {
  const weeklyData = [
    { day: "Mon", progress: 40 },
    { day: "Tue", progress: 70 },
    { day: "Wed", progress: 55 },
    { day: "Thu", progress: 90 },
    { day: "Fri", progress: 80 },
    { day: "Sat", progress: 65 },
    { day: "Sun", progress: 50 },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold mb-6">
        Weekly Progress
      </h2>

      <div className="flex justify-between items-end h-64">
        {weeklyData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="w-10 bg-cyan-400 rounded-t-lg hover:bg-cyan-300 transition"
              style={{
                height: `${item.progress * 2}px`,
              }}
            ></div>

            <p className="text-gray-400">
              {item.day}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyProgress;