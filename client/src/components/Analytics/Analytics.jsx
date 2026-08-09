const stats = [
  {
    title: "Skills Completed",
    value: "12",
    color: "text-green-400",
  },
  {
    title: "Projects Finished",
    value: "5",
    color: "text-cyan-400",
  },
  {
    title: "Learning Streak",
    value: "18 Days",
    color: "text-orange-400",
  },
  {
    title: "Placement Score",
    value: "78%",
    color: "text-purple-400",
  },
];

function Analytics() {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-white mb-8">
        Learning Analytics
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-xl p-6 text-center hover:scale-105 transition duration-300"
          >
            <h3 className="text-gray-400 mb-3">
              {stat.title}
            </h3>

            <p className={`text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;