function InterviewHistory() {
  const history =
    JSON.parse(localStorage.getItem("interviewHistory")) || [];

  return (
    <div className="text-white p-8">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Interview History
      </h1>

      {history.length === 0 ? (
        <p>No interviews taken yet.</p>
      ) : (
        history.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-xl p-6 mb-4"
          >
            <h2 className="text-xl font-bold">
              {item.role.toUpperCase()}
            </h2>

            <p className="mt-2">
              Score: {item.score}%
            </p>

            <p>
              Date: {item.date}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default InterviewHistory;