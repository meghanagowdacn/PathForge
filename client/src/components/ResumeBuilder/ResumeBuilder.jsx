import { useState } from "react";
import ResumePreview from "./ResumePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Resume.css";

function ResumeBuilder() {

  const [resume, setResume] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    skills: "",
    projects: "",
    experience: "",
    certifications: "",
  });


  const handleChange = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });
  };


  const downloadPDF = () => {

    const resumeElement = document.getElementById("resume-preview");

    html2canvas(resumeElement).then((canvas) => {

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save("PathForge_Resume.pdf");

    });

  };


  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">


      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Resume Builder
      </h1>


      <div className="grid lg:grid-cols-2 gap-8">


        {/* LEFT SIDE - FORM */}

        <div className="bg-slate-900 rounded-2xl p-6">

          <div className="space-y-4">


            <input
              name="fullName"
              placeholder="Full Name"
              value={resume.fullName}
              onChange={handleChange}
              className="resume-input"
            />


            <input
              name="email"
              placeholder="Email"
              value={resume.email}
              onChange={handleChange}
              className="resume-input"
            />


            <input
              name="phone"
              placeholder="Phone"
              value={resume.phone}
              onChange={handleChange}
              className="resume-input"
            />


            <input
              name="college"
              placeholder="College"
              value={resume.college}
              onChange={handleChange}
              className="resume-input"
            />


            <input
              name="degree"
              placeholder="Degree"
              value={resume.degree}
              onChange={handleChange}
              className="resume-input"
            />


            <textarea
              name="skills"
              placeholder="Skills"
              value={resume.skills}
              onChange={handleChange}
              className="resume-input"
            />


            <textarea
              name="projects"
              placeholder="Projects"
              value={resume.projects}
              onChange={handleChange}
              className="resume-input"
            />


            <textarea
              name="experience"
              placeholder="Experience"
              value={resume.experience}
              onChange={handleChange}
              className="resume-input"
            />


            <textarea
              name="certifications"
              placeholder="Certifications"
              value={resume.certifications}
              onChange={handleChange}
              className="resume-input"
            />


            <button
              onClick={downloadPDF}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold w-full"
            >
              Download Resume PDF
            </button>


          </div>

        </div>



        {/* RIGHT SIDE - PREVIEW */}

        <ResumePreview resume={resume} />


      </div>


    </div>
  );
}


export default ResumeBuilder;