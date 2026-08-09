import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>

          <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full">
            🚀 AI Powered Career Platform
          </span>

          <h1 className="text-6xl font-extrabold mt-8 leading-tight">
            Forge Your
            <span className="text-cyan-400"> Dream Career</span>
            <br />
            One Skill at a Time.
          </h1>

          <p className="text-gray-400 text-lg mt-8 leading-8">
            Learn skills, build projects, prepare for interviews,
            analyze your resume and track your placement journey
            from one powerful dashboard.
          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/signup"
              className="bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-cyan-300 transition"
            >
              Get Started
            </Link>

            <Link
              to="/roadmap"
              className="border border-cyan-400 px-8 py-4 rounded-xl hover:bg-cyan-400 hover:text-black transition"
            >
              Explore Roadmaps
            </Link>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex justify-center">

          <div className="bg-slate-900 rounded-3xl p-10 shadow-2xl w-full max-w-md">

            <h2 className="text-3xl font-bold text-cyan-400 mb-8">
              Placement Dashboard
            </h2>

            <div className="space-y-6">

              <div>
                <p>Placement Score</p>

                <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
                  <div className="bg-cyan-400 h-3 rounded-full w-3/4"></div>
                </div>

                <p className="mt-2">75%</p>
              </div>

              <div className="flex justify-between">

                <div className="bg-slate-800 p-5 rounded-xl">
                  <h3 className="text-cyan-400 text-2xl font-bold">18</h3>
                  <p>Skills</p>
                </div>

                <div className="bg-slate-800 p-5 rounded-xl">
                  <h3 className="text-cyan-400 text-2xl font-bold">9</h3>
                  <p>Projects</p>
                </div>

                <div className="bg-slate-800 p-5 rounded-xl">
                  <h3 className="text-cyan-400 text-2xl font-bold">42</h3>
                  <p>Tasks</p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
