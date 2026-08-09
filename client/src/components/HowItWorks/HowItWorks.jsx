const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up and create your personal dashboard.",
  },
  {
    number: "02",
    title: "Choose Career",
    description: "Select your dream career roadmap.",
  },
  {
    number: "03",
    title: "Learn Skills",
    description: "Complete skills, projects and practice interviews.",
  },
  {
    number: "04",
    title: "Get Placed",
    description: "Track your progress and become placement ready.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center">
          How PathForge Works
        </h2>

        <p className="text-center text-gray-400 mt-4 mb-16">
          Four simple steps to become placement ready.
        </p>

        <div className="grid md:grid-cols-4 gap-8">

          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-slate-800 rounded-2xl p-8 text-center hover:-translate-y-2 transition duration-300"
            >
              <div className="text-5xl font-extrabold text-cyan-400 mb-6">
                {step.number}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-400">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;