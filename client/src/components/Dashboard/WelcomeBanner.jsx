import { auth } from "../../firebase/firebase";

function WelcomeBanner() {
  const user = auth.currentUser;

  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const quotes = [
    "Success is the sum of small efforts repeated daily.",
    "Keep learning, keep growing.",
    "Every expert was once a beginner.",
    "Consistency beats motivation.",
    "One project at a time."
  ];

  const quote =
    quotes[today.getDate() % quotes.length];

  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">

      <h1 className="text-4xl font-bold">
        Welcome, {user?.email?.split("@")[0]} 
      </h1>

      <p className="mt-2 text-lg">
        {date}
      </p>

      <div className="mt-6 flex flex-wrap gap-6">

        <div>
          <p className="text-sm opacity-80">
            🔥 Current Streak
          </p>

          <h2 className="text-3xl font-bold">
            7 Days
          </h2>
        </div>

        <div>
          <p className="text-sm opacity-80">
            🎯 Goal
          </p>

          <h2 className="text-3xl font-bold">
            Become Job Ready
          </h2>
        </div>

      </div>

      <div className="mt-6 italic">
        "{quote}"
      </div>

    </div>
  );
}

export default WelcomeBanner;