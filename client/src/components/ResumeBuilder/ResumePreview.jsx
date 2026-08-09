function ResumePreview({ resume }) {
  return (
    <div
      id="resume-preview"
      className="bg-white text-black rounded-2xl p-8 shadow-xl"
    >
      <h1 className="text-4xl font-bold text-center">
        {resume.fullName || "Your Name"}
      </h1>

      <div className="text-center mt-3 text-gray-600">
        <p>{resume.email || "email@example.com"}</p>
        <p>{resume.phone || "+91 XXXXXXXXXX"}</p>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-bold text-cyan-700">Education</h2>
      <p className="mt-2">
        {resume.degree || "Degree"}{" "}
        {resume.college && `- ${resume.college}`}
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-bold text-cyan-700">Skills</h2>
      <p className="mt-2 whitespace-pre-wrap">
        {resume.skills || "Add your skills"}
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-bold text-cyan-700">Projects</h2>
      <p className="mt-2 whitespace-pre-wrap">
        {resume.projects || "Add your projects"}
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-bold text-cyan-700">Experience</h2>
      <p className="mt-2 whitespace-pre-wrap">
        {resume.experience || "Add your experience"}
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-bold text-cyan-700">Certifications</h2>
      <p className="mt-2 whitespace-pre-wrap">
        {resume.certifications || "Add your certifications"}
      </p>
    </div>
  );
}

export default ResumePreview;