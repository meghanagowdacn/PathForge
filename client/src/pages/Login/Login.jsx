
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      const idToken = await user.getIdToken();

      const profileResponse = await fetch(
        "http://localhost:5000/api/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const profileData =
        await profileResponse.json();

      console.log(
        "USER PROFILE RESPONSE:",
        profileData
      );

      if (!profileResponse.ok) {
        throw new Error(
          profileData.message ||
            "Failed to load user profile"
        );
      }

      alert(
        `Welcome ${profileData.user.name}! Login successful!`
      );

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.message ||
          "Login failed. Please check your email and password."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      {/* Login Card */}

      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-7">

        {/* Logo / Brand */}

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Path<span className="text-cyan-400">Forge</span>
          </h2>
        </div>

        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mb-7 text-sm">
          Login to continue your PathForge journey
        </p>

        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="space-y-4"
        >

          {/* Hidden fields to discourage autofill */}

          <input
            type="text"
            name="fake-username"
            autoComplete="username"
            tabIndex="-1"
            className="hidden"
          />

          <input
            type="password"
            name="fake-password"
            autoComplete="new-password"
            tabIndex="-1"
            className="hidden"
          />

          {/* Email */}

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Email
            </label>

            <input
              type="email"
              name="login-email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
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
              name="login-password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-gray-500 outline-none border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-bold transition mt-2"
          >
            Login
          </button>

        </form>

        {/* Signup */}

        <p className="text-gray-400 text-center mt-6 text-sm">
          Don't have an account?

          <Link
            to="/signup"
            className="text-cyan-400 ml-2 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;

