
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    github: "",
    linkedin: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          console.log("❌ No logged-in user found");
          setLoading(false);
          return;
        }

        const idToken =
          await user.getIdToken();

        const response = await fetch(
          "https://pathforge-4-iwk7.onrender.com/api/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load profile"
          );
        }

        console.log(
          "✅ Profile loaded:",
          data
        );

        setProfile({
          name: data.user?.name || "",
          email:
            data.user?.email ||
            user.email ||
            "",
          github:
            data.user?.github || "",
          linkedin:
            data.user?.linkedin || "",
          bio: data.user?.bio || "",
        });
      } catch (error) {
        console.error(
          "❌ Profile loading error:",
          error
        );

        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    setSaved(false);

    setProfile((previousProfile) => ({
      ...previousProfile,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const saveProfile = async () => {
    try {
      setSaving(true);
      setSaved(false);

      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      if (!profile.name.trim()) {
        alert("Please enter your full name.");
        return;
      }

      const idToken =
        await user.getIdToken();

      const response = await fetch(
        "https://pathforge-4-iwk7.onrender.com/api/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            name: profile.name.trim(),
            github:
              profile.github.trim(),
            linkedin:
              profile.linkedin.trim(),
            bio: profile.bio.trim(),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save profile"
        );
      }

      console.log(
        "✅ Profile updated:",
        data
      );

      setProfile({
        name: data.user?.name || "",
        email:
          data.user?.email ||
          profile.email,
        github:
          data.user?.github || "",
        linkedin:
          data.user?.linkedin || "",
        bio: data.user?.bio || "",
      });

      setSaved(true);
    } catch (error) {
      console.error(
        "❌ Profile saving error:",
        error
      );

      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-4xl mb-3">
            👤
          </div>

          <p className="text-gray-400">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PROFILE AVATAR
  // ==========================================

  const firstLetter =
    profile.name?.charAt(0) ||
    profile.email?.charAt(0) ||
    "?";

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="max-w-5xl">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8">

        <p className="text-cyan-400 text-sm font-semibold">
          ACCOUNT
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">
          My Profile
        </h1>

        <p className="text-gray-400 mt-3">
          Manage your personal information
          and professional links.
        </p>

      </div>

      {/* ==========================================
          PROFILE CARD
      ========================================== */}

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg overflow-hidden">

        {/* PROFILE HEADER */}

        <div className="p-6 md:p-8 border-b border-slate-800">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-4xl font-bold text-slate-950 shadow-lg shrink-0">
              {firstLetter.toUpperCase()}
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                {profile.name ||
                  "Your Name"}
              </h2>

              <p className="text-gray-400 mt-1">
                {profile.email ||
                  "No email available"}
              </p>

              <div className="flex items-center gap-2 mt-3">

                <span className="w-2 h-2 rounded-full bg-green-400" />

                <span className="text-green-400 text-sm">
                  Account connected
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            FORM
        ========================================== */}

        <div className="p-6 md:p-8 space-y-6">

          {/* NAME */}

          <div>

            <label className="block text-gray-300 font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={profile.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 text-white placeholder:text-gray-500 px-4 py-3 outline-none transition"
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="block text-gray-300 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full rounded-xl bg-slate-800/60 border border-slate-700 text-gray-500 px-4 py-3 cursor-not-allowed"
            />

            <p className="text-gray-600 text-xs mt-2">
              Your email is managed by your
              authentication account.
            </p>

          </div>

          {/* SOCIAL LINKS */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* GITHUB */}

            <div>

              <label className="block text-gray-300 font-medium mb-2">
                GitHub URL
              </label>

              <input
                type="url"
                name="github"
                placeholder="https://github.com/username"
                value={profile.github}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 text-white placeholder:text-gray-500 px-4 py-3 outline-none transition"
              />

            </div>

            {/* LINKEDIN */}

            <div>

              <label className="block text-gray-300 font-medium mb-2">
                LinkedIn URL
              </label>

              <input
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={profile.linkedin}
                onChange={handleChange}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 text-white placeholder:text-gray-500 px-4 py-3 outline-none transition"
              />

            </div>

          </div>

          {/* BIO */}

          <div>

            <div className="flex justify-between items-center mb-2">

              <label className="text-gray-300 font-medium">
                Bio
              </label>

              <span className="text-xs text-gray-600">
                {profile.bio.length}/500
              </span>

            </div>

            <textarea
              rows="6"
              name="bio"
              maxLength="500"
              placeholder="Tell recruiters a little about yourself..."
              value={profile.bio}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 text-white placeholder:text-gray-500 px-4 py-3 outline-none resize-none transition"
            />

          </div>

          {/* ==========================================
              ACTION AREA
          ========================================== */}

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center gap-4">

            <button
              type="button"
              onClick={saveProfile}
              disabled={saving}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold px-7 py-3 rounded-xl transition"
            >
              {saving
                ? "Saving..."
                : "Save Profile"}
            </button>

            {saved && (
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <span>✓</span>
                Profile saved successfully
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;

