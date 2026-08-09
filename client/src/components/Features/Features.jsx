import {
  FaRoad,
  FaChartLine,
  FaLaptopCode,
  FaClipboardCheck,
  FaFileAlt,
  FaRobot,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRoad className="text-4xl text-cyan-400" />,
    title: "AI Career Roadmaps",
    description: "Personalized learning paths for your dream career.",
  },
  {
    icon: <FaChartLine className="text-4xl text-cyan-400" />,
    title: "Placement Score",
    description: "Track your readiness with a smart placement score.",
  },
  {
    icon: <FaLaptopCode className="text-4xl text-cyan-400" />,
    title: "Project Tracker",
    description: "Manage and showcase your development projects.",
  },
  {
    icon: <FaClipboardCheck className="text-4xl text-cyan-400" />,
    title: "Skill Tracker",
    description: "Monitor your progress and improve consistently.",
  },
  {
    icon: <FaFileAlt className="text-4xl text-cyan-400" />,
    title: "Resume Analyzer",
    description: "Get AI-powered suggestions to improve your resume.",
  },
  {
    icon: <FaRobot className="text-4xl text-cyan-400" />,
    title: "Mock Interviews",
    description: "Practice interview questions with AI assistance.",
  },
];

function Features() {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-4">
          Why Choose <span className="text-cyan-400">PathForge?</span>
        </h2>

        <p className="text-center text-gray-400 mb-14">
          Everything you need to prepare for placements in one platform.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 hover:scale-105 transition duration-300 shadow-lg"
            >
              <div className="mb-6">{feature.icon}</div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;