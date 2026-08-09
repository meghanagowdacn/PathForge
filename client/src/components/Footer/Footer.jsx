const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-16">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-4 gap-10">


          {/* Logo Section */}
          <div>
            <h2 className="text-3xl font-bold text-cyan-400">
              PathForge
            </h2>

            <p className="text-gray-400 mt-4">
              Building career paths and helping students become placement ready.
            </p>
          </div>



          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-cyan-400 cursor-pointer">
                Home
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Features
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Careers
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Contact
              </li>
            </ul>
          </div>




          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Resources
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-cyan-400 cursor-pointer">
                Roadmaps
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Projects
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Interview Prep
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Career Guide
              </li>

            </ul>

          </div>




          {/* Contact */}
          <div>

            <h3 className="text-xl font-bold mb-4">
              Contact
            </h3>


            <p className="text-gray-400">
              Email:
            </p>

            <p className="text-cyan-400 mb-3">
              support@pathforge.com
            </p>


            <p className="text-gray-400">
              Follow us:
            </p>


            <div className="flex gap-4 mt-3">

              <span className="bg-slate-800 px-3 py-2 rounded-lg hover:bg-cyan-500 cursor-pointer">
                GitHub
              </span>

              <span className="bg-slate-800 px-3 py-2 rounded-lg hover:bg-cyan-500 cursor-pointer">
                LinkedIn
              </span>

              <span className="bg-slate-800 px-3 py-2 rounded-lg hover:bg-cyan-500 cursor-pointer">
                Twitter
              </span>

            </div>


          </div>


        </div>




        {/* Bottom Line */}

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-gray-500">

          © 2026 PathForge. All rights reserved.

        </div>


      </div>

    </footer>
  );
};


export default Footer;