import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const API_URL =
  "https://pathforge-4-iwk7.onrender.com/api/user/skills";

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
  // LOAD SKILLS FROM FIREBASE
  // ==========================================

  const loadSkills = async (user) => {
    try {
      if (!user) {
        console.log("No Firebase user logged in");

        setSkills([]);
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
          data.message || "Failed to load skills"
        );
      }

      console.log(
        "Skills loaded from Firebase:",
        data
      );

      setSkills(data.skills || []);
    } catch (error) {
      console.error("Load skills error:", error);
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

          loadSkills(user);
        } else {
          console.log(
            "No Firebase user logged in"
          );

          setSkills([]);
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

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },

        body: JSON.stringify({
          name: form.name.trim(),
          level: form.level,
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
          data.message || "Failed to add skill"
        );
      }

      console.log(
        "Skill successfully saved to Firebase:",
        data
      );

      // Add Firebase skill to the UI
      setSkills((previousSkills) => [
        ...previousSkills,
        data.skill,
      ]);

      // Clear form
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

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this skill?"
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
          data.message || "Failed to delete skill"
        );
      }

      console.log(
        "Skill deleted from Firebase:",
        data
      );

      // Remove from UI
      setSkills((previousSkills) =>
        previousSkills.filter(
          (skill) => skill.id !== id
        )
      );

      alert("Skill deleted successfully! ✅");
    } catch (error) {
      console.error(
        "Delete skill error:",
        error
      );

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

      {/* PAGE TITLE */}

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Skills Tracker
      </h1>

      {/* ==========================================
          ADD SKILL
      ========================================== */}

      <div className="bg-slate-900 rounded-xl p-6 mb-10">

        <h2 className="text-2xl font-bold text-white mb-6">
          Add Skill
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {/* SKILL NAME */}

          <input
            type="text"
            name="name"
            placeholder="Skill Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* LEVEL */}

          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="Beginner">
              Beginner
            </option>

            <option value="Intermediate">
              Intermediate
            </option>

            <option value="Advanced">
              Advanced
            </option>
          </select>

          {/* STATUS */}

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="Learning">
              Learning
            </option>

            <option value="Practicing">
              Practicing
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>

        </div>

        {/* ADD BUTTON */}

        <button
          type="button"
          onClick={addSkill}
          disabled={saving}
          className="mt-6 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black px-6 py-3 rounded-lg font-bold transition"
        >
          {saving
            ? "Saving to Firebase..."
            : "Add Skill"}
        </button>

      </div>

      {/* ==========================================
          SKILLS LIST
      ========================================== */}

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
              className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800"
            >

              {/* SKILL NAME */}

              <h2 className="text-2xl font-bold text-white">
                {skill.name}
              </h2>

              {/* LEVEL */}

              <p className="mt-3 text-gray-300">
                <strong>Level:</strong>{" "}
                {skill.level}
              </p>

              {/* STATUS */}

              <p className="mt-2 text-gray-300">
                <strong>Status:</strong>{" "}
                {skill.status}
              </p>

              {/* DELETE */}

              <button
                type="button"
                onClick={() =>
                  deleteSkill(skill.id)
                }
                className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
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