import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import API from "./api";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Auth
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Pages
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import AIResumeAnalyzer from "./pages/AIResumeAnalyzer/AIResumeAnalyzer";
import CareerRoadmap from "./pages/CareerRoadmap/CareerRoadmap";
import Skills from "./pages/Skills/Skills";
import Projects from "./pages/Projects/Projects";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import InterviewHistory from "./pages/InterviewHistory/InterviewHistory";
import ResumeCreator from "./pages/ResumeCreator/ResumeCreator";

function App() {

  useEffect(() => {
    console.log("App component loaded");

    console.log("Testing backend connection...");

    API.get("/")
      .then((response) => {
        console.log("✅ Backend response:", response.data);
      })
      .catch((error) => {
        console.error("❌ Backend connection failed:", error);
      });
  }, []);

  return (
    <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="resume" element={<AIResumeAnalyzer />} />

        <Route path="roadmap" element={<CareerRoadmap />} />

        <Route path="skills" element={<Skills />} />

        <Route path="projects" element={<Projects />} />

        <Route path="profile" element={<Profile />} />

        <Route path="settings" element={<Settings />} />

        <Route path="resume-creator" element={<ResumeCreator />} />

        <Route path="interview" element={<InterviewPrep />} />

        <Route
          path="interview-history"
          element={<InterviewHistory />}
        />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
            <h1 className="text-4xl font-bold">
              404 | Page Not Found
            </h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;