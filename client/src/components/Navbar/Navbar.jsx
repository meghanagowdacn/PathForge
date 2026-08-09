import { useState } from "react";

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="bg-slate-950 text-white fixed w-full top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">


        {/* Logo */}

        <h1 className="text-3xl font-bold text-cyan-400">
          PathForge
        </h1>



        {/* Desktop Menu */}

        <div className="hidden md:flex gap-8 text-gray-300">

          <a href="#" className="hover:text-cyan-400">
            Home
          </a>

          <a href="#features" className="hover:text-cyan-400">
            Features
          </a>

          <a href="#careers" className="hover:text-cyan-400">
            Careers
          </a>

          <a href="#contact" className="hover:text-cyan-400">
            Contact
          </a>

          <button className="bg-cyan-500 text-black px-5 py-2 rounded-full font-bold hover:bg-cyan-400">
            Get Started
          </button>

        </div>




        {/* Mobile Hamburger */}

        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >

          ☰

        </button>


      </div>





      {/* Mobile Menu */}

      {isOpen && (

        <div className="md:hidden bg-slate-900 px-8 py-6 space-y-5">


          <a 
            href="#"
            className="block hover:text-cyan-400"
          >
            Home
          </a>


          <a
            href="#features"
            className="block hover:text-cyan-400"
          >
            Features
          </a>


          <a
            href="#careers"
            className="block hover:text-cyan-400"
          >
            Careers
          </a>


          <a
            href="#contact"
            className="block hover:text-cyan-400"
          >
            Contact
          </a>



          <button className="bg-cyan-500 text-black px-5 py-2 rounded-full font-bold">
            Get Started
          </button>


        </div>

      )}


    </nav>
  );
}


export default Navbar;