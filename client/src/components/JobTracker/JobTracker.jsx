function JobTracker() {
  const jobs = [
    {
      company: "Google",
      role: "Frontend Developer",
      status: "Interview",
    },
    {
      company: "Microsoft",
      role: "Software Engineer",
      status: "Applied",
    },
    {
      company: "Amazon",
      role: "Web Developer",
      status: "Selected",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-yellow-500";
      case "Interview":
        return "bg-blue-500";
      case "Selected":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold mb-6">
        Job Applications
      </h2>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-slate-800 p-4 rounded-lg"
          >
            <div>
              <h3 className="text-lg font-semibold">
                {job.company}
              </h3>

              <p className="text-gray-400">
                {job.role}
              </p>
            </div>

            <span
              className={`${getStatusColor(job.status)} px-4 py-2 rounded-full text-white text-sm`}
            >
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobTracker;