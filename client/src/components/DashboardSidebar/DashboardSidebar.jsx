import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: " Dashboard",
      path: "/dashboard",
    },
    {
      name: " Resume Analyzer",
      path: "/dashboard/resume",
    },
    {
      name: "Career Roadmap",
      path: "/dashboard/roadmap",
    },
    {
      name: " Skills",
      path: "/dashboard/skills",
    },
    {
      name: " Projects",
      path: "/dashboard/projects",
    },
    {
      name: "AI Interview",
      path: "/dashboard/interview",
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
    },
    {
      name: " Settings",
      path: "/dashboard/settings",
    },
    {
  name: " Interview History",
  path: "/dashboard/interview-history",
},
{
  name: " Resume Creator",
  path: "/dashboard/resume-creator",
},

  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 text-white flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-cyan-400">
          PathForge
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          AI Career Platform
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-5 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-cyan-500 text-black font-semibold"
                : "hover:bg-slate-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-5 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 rounded-lg py-3 font-semibold transition"
        >
          Logout
        </button>
      </div>

    </aside>
  );
}

export default DashboardSidebar;