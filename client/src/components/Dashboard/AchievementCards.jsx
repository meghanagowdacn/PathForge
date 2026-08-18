function AchievementCards({
  studyStreak = 0,
  skillsCount = 0,
  projectsCount = 0,
  resumeScore = 0,
}) {
  const achievements = [
    {
      title: "Study Streak",
      value: `${studyStreak} Days`,
      icon: "🔥",
      description: "Keep learning every day",
      gradient:
        "from-orange-500/20 to-red-500/20",
      border:
        "border-orange-500/30",
      iconBg:
        "bg-orange-500/10",
      valueColor:
        "text-orange-400",
    },
    {
      title: "Skills Learned",
      value: skillsCount,
      icon: "⚡",
      description: "Skills added to your profile",
      gradient:
        "from-yellow-400/20 to-orange-400/20",
      border:
        "border-yellow-500/30",
      iconBg:
        "bg-yellow-500/10",
      valueColor:
        "text-yellow-400",
    },
    {
      title: "Projects",
      value: projectsCount,
      icon: "🚀",
      description: "Projects built and completed",
      gradient:
        "from-green-500/20 to-emerald-500/20",
      border:
        "border-green-500/30",
      iconBg:
        "bg-green-500/10",
      valueColor:
        "text-green-400",
    },
    {
      title: "Resume Score",
      value: `${resumeScore}%`,
      icon: "📄",
      description: "Current resume strength",
      gradient:
        "from-cyan-500/20 to-blue-500/20",
      border:
        "border-cyan-500/30",
      iconBg:
        "bg-cyan-500/10",
      valueColor:
        "text-cyan-400",
    },
  ];

  return (
    <div className="mt-10">

      {/* HEADER */}

      <div className="mb-6">

        <p className="text-cyan-400 text-sm font-semibold">
          MILESTONES
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
          Achievements
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          Celebrate the progress you're making
          on your career journey.
        </p>

      </div>

      {/* ACHIEVEMENT CARDS */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {achievements.map((item) => (
          <div
            key={item.title}
            className={`relative overflow-hidden bg-gradient-to-br ${item.gradient} bg-slate-900/80 border ${item.border} rounded-2xl p-6 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
          >

            {/* DECORATIVE CIRCLE */}

            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/5" />

            {/* ICON */}

            <div
              className={`w-14 h-14 ${item.iconBg} border border-white/5 rounded-2xl flex items-center justify-center text-3xl`}
            >
              {item.icon}
            </div>

            {/* TITLE */}

            <h3 className="mt-5 text-base font-semibold text-gray-300">
              {item.title}
            </h3>

            {/* VALUE */}

            <p
              className={`text-3xl font-bold mt-2 ${item.valueColor}`}
            >
              {item.value}
            </p>

            {/* DESCRIPTION */}

            <p className="text-sm text-gray-500 mt-2">
              {item.description}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AchievementCards;

