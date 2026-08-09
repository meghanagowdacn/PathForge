
import { useEffect, useState } from "react";
import { interviewQuestions } from "../../data/interviewQuestions";

function InterviewPrep() {
  const [role, setRole] = useState("");
  const [started, setStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // ==========================================
  // TIMER
  // ==========================================

  useEffect(() => {
    if (!started || finished) {
      return;
    }

    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, started, finished]);

  // ==========================================
  // START INTERVIEW
  // ==========================================

  const startInterview = () => {
    if (!role) {
      alert("Please select a role.");
      return;
    }

    if (
      !interviewQuestions[role] ||
      interviewQuestions[role].length === 0
    ) {
      alert(
        "No questions are available for this role."
      );
      return;
    }

    setCurrentQuestion(0);
    setAnswer("");
    setAnswers([]);
    setScore(0);
    setTimeLeft(60);
    setFinished(false);
    setStarted(true);
  };

  // ==========================================
  // CALCULATE ANSWER SCORE
  // ==========================================

  const calculateAnswerScore = (
    question,
    userAnswer
  ) => {
    if (!userAnswer.trim()) {
      return 0;
    }

    const normalizedAnswer =
      userAnswer.toLowerCase();

    return question.answer.reduce(
      (marks, keyword) => {
        if (
          normalizedAnswer.includes(
            keyword.toLowerCase()
          )
        ) {
          return marks + 1;
        }

        return marks;
      },
      0
    );
  };

  // ==========================================
  // NEXT QUESTION
  // ==========================================

  const handleNextQuestion = () => {
    const questions =
      interviewQuestions[role];

    const question =
      questions[currentQuestion];

    const answerScore =
      calculateAnswerScore(
        question,
        answer
      );

    const updatedScore =
      score + answerScore;

    const updatedAnswers = [
      ...answers,
      {
        question: question.question,
        answer: answer.trim(),
        score: answerScore,
      },
    ];

    setAnswers(updatedAnswers);
    setScore(updatedScore);
    setAnswer("");

    // ==========================================
    // FINISH INTERVIEW
    // ==========================================

    if (
      currentQuestion ===
      questions.length - 1
    ) {
      const totalMarks =
        questions.reduce(
          (sum, item) =>
            sum + item.answer.length,
          0
        );

      const percentage =
        totalMarks > 0
          ? Math.round(
              (updatedScore /
                totalMarks) *
                100
            )
          : 0;

      const history =
        JSON.parse(
          localStorage.getItem(
            "interviewHistory"
          )
        ) || [];

      history.unshift({
        role,
        score: percentage,
        questionsAnswered:
          updatedAnswers.length,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem(
        "interviewHistory",
        JSON.stringify(history)
      );

      setFinished(true);
      return;
    }

    setCurrentQuestion(
      (previous) => previous + 1
    );

    setTimeLeft(60);
  };

  // ==========================================
  // RESTART
  // ==========================================

  const restartInterview = () => {
    setRole("");
    setStarted(false);
    setFinished(false);
    setCurrentQuestion(0);
    setAnswer("");
    setAnswers([]);
    setScore(0);
    setTimeLeft(60);
  };

  // ==========================================
  // START SCREEN
  // ==========================================

  if (!started) {
    return (
      <div className="max-w-4xl">

        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-semibold">
            INTERVIEW PREPARATION
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">
            AI Interview Preparation
          </h1>

          <p className="text-gray-400 mt-3">
            Practice technical interview questions
            and measure your readiness.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-2xl shadow-lg">

          

          <h2 className="text-2xl font-bold text-white mb-2">
            Choose Your Role
          </h2>

          <p className="text-gray-400 mb-6">
            Select a role to start your mock
            interview.
          </p>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
          >
            <option value="">
              Choose Role
            </option>

            <option value="frontend">
              Frontend Developer
            </option>

            <option value="python">
              Python Developer
            </option>

            <option value="java">
              Java Developer
            </option>
          </select>

          <div className="grid md:grid-cols-3 gap-4 mt-6">

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Questions
              </p>

              <p className="text-xl font-bold text-white mt-1">
                {role &&
                interviewQuestions[role]
                  ? interviewQuestions[
                      role
                    ].length
                  : "—"}
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Time
              </p>

              <p className="text-xl font-bold text-white mt-1">
                60s / Question
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Score
              </p>

              <p className="text-xl font-bold text-white mt-1">
                Instant
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={startInterview}
            className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-bold transition"
          >
            Start Interview →
          </button>

        </div>
      </div>
    );
  }

  // ==========================================
  // FINISHED SCREEN
  // ==========================================

  if (finished) {
    const questions =
      interviewQuestions[role];

    const totalMarks =
      questions.reduce(
        (sum, question) =>
          sum + question.answer.length,
        0
      );

    const percentage =
      totalMarks > 0
        ? Math.round(
            (score / totalMarks) * 100
          )
        : 0;

    let resultMessage =
      "Keep Practicing 💪";

    if (percentage >= 80) {
      resultMessage =
        "Excellent Performance! 🎉";
    } else if (percentage >= 60) {
      resultMessage =
        "Good Job! Keep Improving 🚀";
    }

    return (
      <div className="max-w-4xl">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-lg">

          <div className="text-6xl mb-5">
            {percentage >= 80
              ? "🏆"
              : percentage >= 60
              ? "👏"
              : "💪"}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Interview Completed
          </h1>

          <p className="text-gray-400 mt-3">
            {resultMessage}
          </p>

          <div className="my-8">

            <p className="text-gray-400">
              Final Score
            </p>

            <p
              className={`text-7xl font-bold mt-2 ${
                percentage >= 80
                  ? "text-green-400"
                  : percentage >= 60
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {percentage}%
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="bg-slate-800 rounded-xl p-5">
              <p className="text-gray-500 text-sm">
                Role
              </p>

              <p className="text-white font-bold mt-1 capitalize">
                {role} Developer
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              <p className="text-gray-500 text-sm">
                Questions
              </p>

              <p className="text-white font-bold mt-1">
                {answers.length}
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              <p className="text-gray-500 text-sm">
                Marks
              </p>

              <p className="text-white font-bold mt-1">
                {score} / {totalMarks}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={restartInterview}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-3 rounded-xl font-bold transition"
          >
            Practice Again
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // INTERVIEW QUESTION
  // ==========================================

  const questions =
    interviewQuestions[role];

  const question =
    questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  return (
    <div className="max-w-4xl">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <p className="text-gray-500 text-sm">
            {role.toUpperCase()} INTERVIEW
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Question {currentQuestion + 1}{" "}
            <span className="text-gray-500">
              / {questions.length}
            </span>
          </h1>

        </div>

        <div
          className={`px-5 py-3 rounded-xl font-bold text-lg ${
            timeLeft <= 10
              ? "bg-red-500/10 text-red-400"
              : "bg-cyan-500/10 text-cyan-400"
          }`}
        >
          ⏱ {timeLeft}s
        </div>

      </div>

      {/* PROGRESS */}

      <div className="w-full bg-slate-800 rounded-full h-2 mb-8">

        <div
          className="bg-cyan-500 h-2 rounded-full transition-all"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* QUESTION */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">

        <div className="flex items-start gap-4 mb-7">

          <div className="w-10 h-10 shrink-0 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
            {currentQuestion + 1}
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
            {question.question}
          </h2>

        </div>

        <textarea
          rows="8"
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          placeholder="Write your answer here..."
          className="w-full rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-gray-500 p-5 outline-none focus:border-cyan-500 resize-none"
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">

          <p className="text-gray-500 text-sm">
            Explain your answer clearly and
            include relevant concepts.
          </p>

          <button
            type="button"
            onClick={handleNextQuestion}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-7 py-3 rounded-xl font-bold transition"
          >
            {currentQuestion ===
            questions.length - 1
              ? "Finish Interview ✓"
              : "Next Question →"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default InterviewPrep;

