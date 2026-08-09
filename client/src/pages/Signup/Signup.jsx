
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      console.log("AUTH OBJECT:", auth);

      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Signup failed"
        );
      }

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created successfully! 🎉");

      navigate("/dashboard");

    } catch (error) {
      console.error("Signup error:", error);

      alert(
        error.message ||
          "Unable to create account."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">

      {/* Signup Card */}

      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-7">

        {/* Brand */}

        <div className="text-center mb-5">
          <h2 className="text-2xl font-bold text-white">
            Path<span className="text-cyan-400">
              Forge
            </span>
          </h2>
        </div>

        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Start your PathForge career journey
        </p>

        <form
          onSubmit={handleSignup}
          autoComplete="off"
          className="space-y-4"
        >

          {/* Full Name */}

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="signup-name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              autoComplete="off"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-gray-500 outline-none border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Email
            </label>

            <input
              type="email"
              name="signup-email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="off"
              autoCapitalize="none"
              spellCheck="false"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-gray-500 outline-none border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          {/* Password */}

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Password
            </label>

            <input
              type="password"
              name="signup-password"
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="new-password"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-gray-500 outline-none border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          {/* Confirm Password */}

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              name="signup-confirm-password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              autoComplete="new-password"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-gray-500 outline-none border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          {/* Create Account */}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-bold transition mt-2"
          >
            Create Account
          </button>

        </form>

        {/* Login */}

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?

          <Link
            to="/login"
            className="text-cyan-400 ml-2 hover:underline font-medium"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;
