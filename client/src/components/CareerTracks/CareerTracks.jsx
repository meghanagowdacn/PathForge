const careers = [
  {
    title: "Full Stack Developer",
    icon: "💻",
    duration: "12 Months",
    skills: "HTML • CSS • JavaScript • React • Node.js",
  },
  {
    title: "AI Engineer",
    icon: "🤖",
    duration: "10 Months",
    skills: "Python • Machine Learning • TensorFlow",
  },
  {
    title: "Data Analyst",
    icon: "📊",
    duration: "8 Months",
    skills: "Excel • SQL • Python • Power BI",
  },
  {
    title: "Cloud Engineer",
    icon: "☁️",
    duration: "9 Months",
    skills: "AWS • Docker • Linux • CI/CD",
  },
  {
    title: "Cyber Security",
    icon: "🔒",
    duration: "10 Months",
    skills: "Networking • Kali Linux • OWASP",
  },
  {
    title: "Android Developer",
    icon: "📱",
    duration: "9 Months",
    skills: "Java • Kotlin • Android Studio",
  },
];

function CareerTracks() {
  return (
    <section className="bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-4">
          Explore Career Tracks
        </h2>

        <p className="text-center text-gray-400 mb-12">
          Select your dream career and follow a structured roadmap.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {careers.map((career, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:-translate-y-2 hover:shadow-cyan-500/20 transition duration-300"
            >
              <div className="text-5xl mb-5">
                {career.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {career.title}
              </h3>

              <p className="text-gray-400 mb-4">
                {career.skills}
              </p>

              <span className="inline-block bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                {career.duration}
              </span>

              <button className="mt-6 w-full bg-cyan-400 text-black py-3 rounded-xl font-semibold hover:bg-cyan-300 transition">
                View Roadmap →
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CareerTracks;