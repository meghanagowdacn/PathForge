const roadmap = [
  {
    stage: "Beginner",
    progress: "Completed",
    color: "bg-green-500",
  },
  {
    stage: "Intermediate",
    progress: "In Progress",
    color: "bg-yellow-500",
  },
  {
    stage: "Advanced",
    progress: "Locked",
    color: "bg-gray-500",
  },
  {
    stage: "Placement Ready",
    progress: "Locked",
    color: "bg-gray-500",
  },
];

function Roadmap() {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold mb-8 text-white">
        Career Roadmap
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {roadmap.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-xl p-6 text-center hover:-translate-y-2 transition duration-300"
          >

            <div
              className={`w-5 h-5 rounded-full mx-auto mb-4 ${item.color}`}
            ></div>

            <h3 className="text-xl font-bold text-white">
              {item.stage}
            </h3>

            <p className="text-gray-400 mt-3">
              {item.progress}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Roadmap;