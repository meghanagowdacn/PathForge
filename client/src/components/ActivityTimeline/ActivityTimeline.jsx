function ActivityTimeline() {
  const activities = [
    {
      title: "Completed HTML Module",
      time: "Today",
    },
    {
      title: "Finished Weather App Project",
      time: "Yesterday",
    },
    {
      title: "Reached 75% Placement Score",
      time: "2 Days Ago",
    },
    {
      title: "Started React Roadmap",
      time: "Last Week",
    },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Activity
      </h2>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-3 h-3 mt-2 rounded-full bg-cyan-400"></div>

            <div>
              <h3 className="font-semibold text-white">
                {activity.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;