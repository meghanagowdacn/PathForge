import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";

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
  // LOAD PROJECTS
  // ==========================================

  const loadProjects = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.log("No logged-in user found");
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch(
        "https://pathforge-4-iwk7.onrender.com/api/user/projects",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load projects"
        );
      }

      console.log("Projects loaded:", data);

      setProjects(data.projects || []);

    } catch (error) {
      console.error("Load projects error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadProjects();
  }, []);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // ==========================================
  // ADD PROJECT
  // ==========================================

  const addProject = async () => {
    if (!form.title.trim() || !form.tech.trim()) {
      alert(
        "Please fill in Project Name and Technologies."
      );
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

      const response = await fetch(
        "https://pathforge-4-iwk7.onrender.com/api/user/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add project"
        );
      }

      console.log("Project added:", data);

      // Add newly created project to UI
      setProjects((prevProjects) => [
        ...prevProjects,
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

      const idToken = await user.getIdToken();

      const response = await fetch(
        `https://pathforge-4-iwk7.onrender.com/api/user/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete project"
        );
      }

      console.log("Project deleted:", data);

      // Remove project from UI
      setProjects((prevProjects) =>
        prevProjects.filter(
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

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        My Projects
      </h1>


      {/* Add Project */}

      <div className="bg-slate-900 rounded-xl p-6 mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Add New Project
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {/* Project Name */}

          <input
            type="text"
            name="title"
            placeholder="Project Name"
            value={form.title}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          />


          {/* Technologies */}

          <input
            type="text"
            name="tech"
            placeholder="Technologies Used"
            value={form.tech}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          />


          {/* GitHub */}

          <input
            type="text"
            name="github"
            placeholder="GitHub Link"
            value={form.github}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          />


          {/* Demo */}

          <input
            type="text"
            name="demo"
            placeholder="Live Demo Link"
            value={form.demo}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          />


          {/* Status */}

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          >
            <option>Completed</option>
            <option>In Progress</option>
          </select>

        </div>


        <button
          onClick={addProject}
          disabled={saving}
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black px-6 py-3 rounded-lg font-bold"
        >
          {saving ? "Adding..." : "Add Project"}
        </button>

      </div>


      {/* Project List */}

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
              className="bg-slate-900 rounded-xl p-6 shadow-lg"
            >

              <h2 className="text-2xl font-bold">
                {project.title}
              </h2>


              <p className="text-gray-400 mt-2">
                {project.tech}
              </p>


              <p className="mt-3">
                <strong>Status:</strong>{" "}
                {project.status}
              </p>


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


              <button
                onClick={() =>
                  deleteProject(project.id)
                }
                className="mt-6 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
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