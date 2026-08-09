function StatsCards() {
  const stats = [
    {
      title: "Placement Score",
      value: "78%",
    },
    {
      title: "Skills Completed",
      value: "18",
    },
    {
      title: "Projects",
      value: "9",
    },
    {
      title: "Tasks Completed",
      value: "42",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-cyan-400 transition"
        >
          <p className="text-gray-400 text-sm">{stat.title}</p>

          <h2 className="text-3xl font-bold text-cyan-400 mt-2">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;