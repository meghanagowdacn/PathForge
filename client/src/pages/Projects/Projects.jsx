import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const API_URL =
  "https://pathforge-4-iwk7.onrender.com/api/user/projects";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    tech: "",
    github: "",
    demo: "",
    status: "Completed",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // LOAD PROJECTS FROM FIREBASE
  // ==========================================

  const loadProjects = async (user) => {
    try {
      if (!user) {
        setProjects([]);
        setLoading(false);
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      // Get response safely
      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Server returned an invalid response. Please check that the backend is running."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load projects"
        );
      }

      console.log("Projects loaded from Firebase:", data);

      setProjects(data.projects || []);
    } catch (error) {
      console.error("Load projects error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // WAIT FOR FIREBASE LOGIN
  // ==========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log(
            "Logged-in Firebase user:",
            user.email
          );

          loadProjects(user);
        } else {
          console.log("No Firebase user logged in");

          setProjects([]);
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // ==========================================
  // ADD PROJECT
  // ==========================================

  const addProject = async () => {
    if (!form.title.trim()) {
      alert("Please enter the project name.");
      return;
    }

    if (!form.tech.trim()) {
      alert("Please enter the technologies used.");
      return;
    }

    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },

        body: JSON.stringify({
          title: form.title.trim(),
          tech: form.tech.trim(),
          github: form.github.trim(),
          demo: form.demo.trim(),
          status: form.status,
        }),
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Server returned an invalid response. Please check your backend."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add project"
        );
      }

      console.log(
        "Project successfully saved to Firebase:",
        data
      );

      // Add returned Firebase project to UI
      setProjects((previousProjects) => [
        ...previousProjects,
        data.project,
      ]);

      // Clear form
      setForm({
        title: "",
        tech: "",
        github: "",
        demo: "",
        status: "Completed",
      });

      alert("Project added successfully! ✅");
    } catch (error) {
      console.error("Add project error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE PROJECT
  // ==========================================

  const deleteProject = async (id) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this project?"
      );

      if (!confirmDelete) {
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete project"
        );
      }

      console.log(
        "Project deleted from Firebase:",
        data
      );

      // Remove from UI
      setProjects((previousProjects) =>
        previousProjects.filter(
          (project) => project.id !== id
        )
      );

      alert("Project deleted successfully! ✅");
    } catch (error) {
      console.error("Delete project error:", error);
      alert(error.message);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="text-gray-400 text-center p-10">
        Loading projects...
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div>
      {/* PAGE TITLE */}

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        My Projects
      </h1>

      {/* ==========================================
          ADD PROJECT FORM
      ========================================== */}

      <div className="bg-slate-900 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-white mb-5">
          Add New Project
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {/* PROJECT NAME */}

          <input
            type="text"
            name="title"
            placeholder="Project Name"
            value={form.title}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* TECHNOLOGIES */}

          <input
            type="text"
            name="tech"
            placeholder="Technologies Used"
            value={form.tech}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* GITHUB */}

          <input
            type="text"
            name="github"
            placeholder="GitHub Link"
            value={form.github}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* LIVE DEMO */}

          <input
            type="text"
            name="demo"
            placeholder="Live Demo Link"
            value={form.demo}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* STATUS */}

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="Completed">
              Completed
            </option>

            <option value="In Progress">
              In Progress
            </option>
          </select>
        </div>

        {/* ADD BUTTON */}

        <button
          type="button"
          onClick={addProject}
          disabled={saving}
          className="mt-6 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black px-6 py-3 rounded-lg font-bold transition"
        >
          {saving ? "Saving to Firebase..." : "Add Project"}
        </button>
      </div>

      {/* ==========================================
          PROJECT LIST
      ========================================== */}

      <div className="grid lg:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="bg-slate-900 rounded-xl p-6">
            <h2 className="text-xl text-gray-400">
              No projects added yet.
            </h2>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800"
            >
              {/* TITLE */}

              <h2 className="text-2xl font-bold text-white">
                {project.title}
              </h2>

              {/* TECHNOLOGY */}

              <p className="text-gray-400 mt-2">
                {project.tech}
              </p>

              {/* STATUS */}

              <p className="mt-3 text-gray-300">
                <strong>Status:</strong>{" "}
                {project.status}
              </p>

              {/* GITHUB */}

              {project.github && (
                <p className="mt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 underline"
                  >
                    GitHub Repository
                  </a>
                </p>
              )}

              {/* DEMO */}

              {project.demo && (
                <p className="mt-2">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-400 underline"
                  >
                    Live Demo
                  </a>
                </p>
              )}

              {/* DELETE */}

              <button
                type="button"
                onClick={() =>
                  deleteProject(project.id)
                }
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Projects;