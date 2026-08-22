import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white">

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="md:ml-64 flex-1 p-8 transition-colors duration-300">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;