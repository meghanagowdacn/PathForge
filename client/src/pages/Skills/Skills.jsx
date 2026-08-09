import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

function Skills() {
  const [skills, setSkills] = useState([]);

  const [form, setForm] = useState({
    name: "",
    level: "Beginner",
    status: "Learning",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  // ==========================================
  // LOAD SKILLS
  // ==========================================

  const loadSkills = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.log("No logged-in user found");
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch(
        "http://localhost:5000/api/user/skills",
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
          data.message || "Failed to load skills"
        );
      }

      console.log("Skills loaded:", data);

      setSkills(data.skills || []);

    } catch (error) {
      console.error("Load skills error:", error);
      alert(error.message);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadSkills();
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
  // ADD SKILL
  // ==========================================

  const addSkill = async () => {
    if (!form.name.trim()) {
      alert("Please enter a skill name.");
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
        "http://localhost:5000/api/user/skills",
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
          data.message || "Failed to add skill"
        );
      }

      console.log("Skill added:", data);

      setSkills((previousSkills) => [
        ...previousSkills,
        data.skill,
      ]);

      setForm({
        name: "",
        level: "Beginner",
        status: "Learning",
      });

      alert("Skill added successfully! ✅");

    } catch (error) {
      console.error("Add skill error:", error);
      alert(error.message);

    } finally {
      setSaving(false);
    }
  };


  // ==========================================
  // DELETE SKILL
  // ==========================================

  const deleteSkill = async (id) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch(
        `http://localhost:5000/api/user/skills/${id}`,
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
          data.message || "Failed to delete skill"
        );
      }

      console.log("Skill deleted:", data);

      setSkills((previousSkills) =>
        previousSkills.filter(
          (skill) => skill.id !== id
        )
      );

      alert("Skill deleted successfully! ✅");

    } catch (error) {
      console.error("Delete skill error:", error);
      alert(error.message);
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="text-gray-400 text-center p-10">
        Loading skills...
      </div>
    );
  }


  // ==========================================
  // UI
  // ==========================================

  return (
    <div>

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Skills Tracker
      </h1>


      {/* Add Skill */}

      <div className="bg-slate-900 rounded-xl p-6 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Add Skill
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {/* Skill Name */}

          <input
            type="text"
            name="name"
            placeholder="Skill Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          />


          {/* Level */}

          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>


          {/* Status */}

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          >
            <option>Learning</option>
            <option>Practicing</option>
            <option>Completed</option>
          </select>

        </div>


        <button
          onClick={addSkill}
          disabled={saving}
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black px-6 py-3 rounded-lg font-bold"
        >
          {saving ? "Adding..." : "Add Skill"}
        </button>

      </div>


      {/* Skills List */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {skills.length === 0 ? (

          <div className="bg-slate-900 rounded-xl p-6">

            <h2 className="text-gray-400">
              No skills added yet.
            </h2>

          </div>

        ) : (

          skills.map((skill) => (

            <div
              key={skill.id}
              className="bg-slate-900 rounded-xl p-6 shadow-lg"
            >

              <h2 className="text-2xl font-bold">
                {skill.name}
              </h2>


              <p className="mt-2 text-gray-300">
                <strong>Level:</strong>{" "}
                {skill.level}
              </p>


              <p className="mt-2 text-gray-300">
                <strong>Status:</strong>{" "}
                {skill.status}
              </p>


              <button
                onClick={() =>
                  deleteSkill(skill.id)
                }
                className="mt-5 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
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

export default Skills;