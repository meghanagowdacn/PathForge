
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useTheme } from "../../context/ThemeContext";

function Settings() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Please login first.");
      return;
    }

    if (!currentPassword) {
      alert("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      alert("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    if (currentPassword === newPassword) {
      alert(
        "New password must be different from your current password."
      );
      return;
    }

    try {
      setChangingPassword(true);
      setPasswordMessage("");

      const user = auth.currentUser;

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      setCurrentPassword("");
      setNewPassword("");

      setPasswordMessage("Password updated successfully.");
    } catch (error) {
      console.error("❌ Password update error:", error);

      if (error.code === "auth/invalid-credential") {
        alert("Current password is incorrect.");
      } else if (error.code === "auth/weak-password") {
        alert("Password is too weak. Use at least 6 characters.");
      } else if (error.code === "auth/requires-recent-login") {
        alert(
          "For security, please log in again before changing your password."
        );
      } else {
        alert(error.message || "Failed to update password.");
      }
    } finally {
      setChangingPassword(false);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("❌ Logout error:", error);
      alert("Failed to logout.");
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div>

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8">
        <p className="text-cyan-400 text-sm font-semibold">
          ACCOUNT
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">
          Settings
        </h1>

        <p className="text-gray-400 mt-3">
          Manage your account preferences and security.
        </p>
      </div>

      <div className="space-y-6">

        {/* ==========================================
            ACCOUNT
        ========================================== */}

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-2xl">
              👤
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Account
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Your authenticated account
              </p>
            </div>

          </div>

          <div className="mt-6 bg-slate-800/70 border border-slate-700 rounded-xl p-4">

            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Email Address
            </p>

            <p className="text-gray-200 mt-1 break-all">
              {auth.currentUser?.email || "No email available"}
            </p>

          </div>

        </div>

        {/* ==========================================
            APPEARANCE
        ========================================== */}

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl">
                {darkMode ? "🌙" : "☀️"}
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Appearance
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Switch between light and dark mode.
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                darkMode
                  ? "bg-green-500 hover:bg-green-400 text-slate-950"
                  : "bg-slate-700 hover:bg-slate-600 text-white"
              }`}
            >
              {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>

          </div>

        </div>

        {/* ==========================================
            PASSWORD
        ========================================== */}

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-2xl">
              🔐
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Change Password
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Update your Firebase account password.
              </p>
            </div>

          </div>

          {/* PASSWORD FORM */}

          <form
            onSubmit={handlePasswordChange}
            className="space-y-4 max-w-2xl"
          >

            {/* HIDDEN USERNAME FOR BROWSER ACCESSIBILITY */}

            <input
              type="email"
              name="username"
              autoComplete="username"
              value={auth.currentUser?.email || ""}
              readOnly
              className="sr-only"
            />

            {/* CURRENT PASSWORD */}

            <div>

              <label className="block text-gray-300 text-sm font-medium mb-2">
                Current Password
              </label>

              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                autoComplete="current-password"
                className="w-full rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 text-white placeholder:text-gray-500 px-4 py-3 outline-none transition"
              />

            </div>

            {/* NEW PASSWORD */}

            <div>

              <label className="block text-gray-300 text-sm font-medium mb-2">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                autoComplete="new-password"
                className="w-full rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 text-white placeholder:text-gray-500 px-4 py-3 outline-none transition"
              />

              <p className="text-gray-600 text-xs mt-2">
                Minimum 6 characters.
              </p>

            </div>

            <button
              type="submit"
              disabled={changingPassword}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 px-6 py-3 rounded-xl font-bold transition"
            >
              {changingPassword
                ? "Updating..."
                : "Update Password"}
            </button>

            {passwordMessage && (
              <p className="text-green-400 text-sm font-medium">
                ✓ {passwordMessage}
              </p>
            )}

          </form>

        </div>

        {/* ==========================================
            ACCOUNT ACTIONS
        ========================================== */}

        <div className="bg-slate-900/80 border border-red-500/10 rounded-2xl p-6 shadow-lg">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-2xl">
                🚪
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Account Actions
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Sign out of your PathForge account.
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;

