import { useState } from "react";

function JobApplicationTracker() {
  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const addApplication = () => {
    if (!company || !role) return;

    setApplications([
      ...applications,
      {
        company,
        role,
        status,
        date: new Date().toLocaleDateString(),
      },
    ]);

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">
        Job Application Tracker
      </h2>

      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          className="bg-slate-800 p-3 rounded-lg outline-none"
        />

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          className="bg-slate-800 p-3 rounded-lg outline-none"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-slate-800 p-3 rounded-lg"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={addApplication}
          className="bg-cyan-400 text-black rounded-lg font-bold"
        >
          Add
        </button>

      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-3">Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {applications.map((app, index) => (

            <tr key={index} className="border-b border-slate-800">

              <td className="py-3">{app.company}</td>

              <td>{app.role}</td>

              <td>{app.status}</td>

              <td>{app.date}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default JobApplicationTracker;