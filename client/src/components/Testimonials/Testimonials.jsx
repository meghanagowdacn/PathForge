const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Full Stack Developer",
    feedback:
      "PathForge helped me organize my learning journey and land my internship with confidence.",
  },
  {
    name: "Priya Patel",
    role: "Data Analyst",
    feedback:
      "The roadmap and progress tracker kept me motivated every day. Highly recommended!",
  },
  {
    name: "Arjun Kumar",
    role: "AI Engineer",
    feedback:
      "The placement score and project tracker gave me a clear idea of where I needed to improve.",
  },
];

function Testimonials() {
  return (
    <section className="bg-slate-950 text-white py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-4">
          What Our Users Say
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Success stories from learners using PathForge.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((user, index) => (
            <div
              key={index}
              className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300"
            >
              <div className="text-5xl mb-6">⭐</div>

              <p className="text-gray-300 italic mb-6">
                "{user.feedback}"
              </p>

              <h3 className="text-xl font-bold text-cyan-400">
                {user.name}
              </h3>

              <p className="text-gray-500">
                {user.role}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;