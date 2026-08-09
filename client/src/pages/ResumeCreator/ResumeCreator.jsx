import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


function ResumeCreator() {

  const resumeRef = useRef();

  const [resume, setResume] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",

    objective: "",
    skills: "",

    education: [],
    projects: [],
    experience: [],
    certifications: [],
    languages: [],
  });


  // ---------------- EDUCATION ----------------

  const [education, setEducation] = useState({
    college: "",
    degree: "",
    cgpa: "",
    year: "",
  });


  // ---------------- PROJECT ----------------

  const [project, setProject] = useState({
    title: "",
    tech: "",
    description: "",
    github: "",
  });


  // ---------------- CERTIFICATE ----------------

  const [certificate, setCertificate] = useState({
    title: "",
    issuer: "",
    year: "",
  });


  const [language, setLanguage] = useState("");


  // ---------------- GENERAL INPUT ----------------

  const handleChange = (e) => {

    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });

  };



  // ---------------- EDUCATION ----------------


  const handleEducationChange = (e) => {

    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });

  };


  const addEducation = () => {

    if(!education.college || !education.degree){
      alert("Enter education details");
      return;
    }


    setResume({
      ...resume,
      education:[
        ...resume.education,
        education
      ]
    });


    setEducation({
      college:"",
      degree:"",
      cgpa:"",
      year:"",
    });

  };



  const deleteEducation = (index)=>{

    setResume({
      ...resume,
      education:
      resume.education.filter((_,i)=>i!==index)
    });

  };



  // ---------------- PROJECT ----------------


  const handleProjectChange=(e)=>{

    setProject({
      ...project,
      [e.target.name]:e.target.value
    });

  };



  const addProject=()=>{


    if(!project.title){
      alert("Enter project name");
      return;
    }


    setResume({

      ...resume,

      projects:[
        ...resume.projects,
        project
      ]

    });


    setProject({
      title:"",
      tech:"",
      description:"",
      github:"",
    });


  };



  const deleteProject=(index)=>{

    setResume({

      ...resume,

      projects:
      resume.projects.filter((_,i)=>i!==index)

    });

  };



  // ---------------- LANGUAGE ----------------


  const addLanguage=()=>{


    if(!language.trim()) return;


    setResume({

      ...resume,

      languages:[
        ...resume.languages,
        language
      ]

    });


    setLanguage("");

  };



  const deleteLanguage=(index)=>{

    setResume({

      ...resume,

      languages:
      resume.languages.filter((_,i)=>i!==index)

    });

  };



  // ---------------- CERTIFICATE ----------------


  const handleCertificateChange=(e)=>{

    setCertificate({

      ...certificate,

      [e.target.name]:e.target.value

    });

  };



  const addCertificate=()=>{


    if(!certificate.title || !certificate.issuer){

      alert("Enter certificate details");
      return;

    }


    setResume({

      ...resume,

      certifications:[
        ...resume.certifications,
        certificate
      ]

    });



    setCertificate({

      title:"",
      issuer:"",
      year:""

    });


  };



  const deleteCertificate=(index)=>{


    setResume({

      ...resume,

      certifications:
      resume.certifications.filter((_,i)=>i!==index)

    });


  };



  // ---------------- SAVE RESUME ----------------


  const saveResume = async()=>{

    try{

      await addDoc(
        collection(db,"resumes"),
        resume
      );


      alert("Resume saved successfully!");

    }

    catch(error){

      console.log(error);

      alert("Failed to save resume");

    }

  };



  // ---------------- DOWNLOAD PDF ----------------

const downloadResume = async () => {

  const element = resumeRef.current;

  if (!element) {
    alert("Resume preview not found");
    return;
  }

  try {

    // Clone resume preview
    const clone = element.cloneNode(true);

    // Remove Tailwind colors that use oklch
    clone.querySelectorAll("*").forEach((el) => {

      el.style.color = "#000000";
      el.style.backgroundColor = "#ffffff";
      el.style.borderColor = "#cccccc";

    });


    clone.style.width = element.offsetWidth + "px";
    clone.style.backgroundColor = "#ffffff";
    clone.style.color = "#000000";


    document.body.appendChild(clone);


    const canvas = await html2canvas(clone, {

      scale: 2,

      backgroundColor: "#ffffff",

      useCORS: true,

    });



    document.body.removeChild(clone);



    const imgData = canvas.toDataURL("image/png");


    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );


    const pdfWidth =
      pdf.internal.pageSize.getWidth();


    const pdfHeight =
      (canvas.height * pdfWidth) /
      canvas.width;



    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );


    pdf.save(
      `${resume.fullName || "Resume"}.pdf`
    );


  } catch(error){

    console.log(error);

    alert("Unable to generate PDF");

  }

};
  


  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">


      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Resume Creator
      </h1>


      <div className="grid lg:grid-cols-2 gap-8">

      
            {/* LEFT SIDE */}

      <div className="bg-slate-900 rounded-xl p-6">


        <h2 className="text-2xl font-bold mb-6">
          Enter Your Details
        </h2>


        <div className="space-y-4">


          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={resume.fullName}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800"
          />


          <input
            type="email"
            name="email"
            placeholder="Email"
            value={resume.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800"
          />


          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={resume.phone}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800"
          />


          <input
            type="text"
            name="address"
            placeholder="Address"
            value={resume.address}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800"
          />


          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={resume.linkedin}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800"
          />


          <input
            type="text"
            name="github"
            placeholder="GitHub URL"
            value={resume.github}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800"
          />


          <input
            type="text"
            name="portfolio"
            placeholder="Portfolio Website"
            value={resume.portfolio}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800"
          />



          <textarea
            name="objective"
            placeholder="Career Objective"
            value={resume.objective}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 rounded bg-slate-800"
          />


          <textarea
            name="skills"
            placeholder="Skills (HTML, CSS, React...)"
            value={resume.skills}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 rounded bg-slate-800"
          />



          {/* EDUCATION */}


          <div className="border-t border-slate-700 pt-6 mt-8">


            <h2 className="text-2xl font-bold mb-4">
              Education
            </h2>



            <input
              type="text"
              name="college"
              placeholder="College Name"
              value={education.college}
              onChange={handleEducationChange}
              className="w-full p-3 rounded bg-slate-800 mb-3"
            />



            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={education.degree}
              onChange={handleEducationChange}
              className="w-full p-3 rounded bg-slate-800 mb-3"
            />



            <input
              type="text"
              name="cgpa"
              placeholder="CGPA"
              value={education.cgpa}
              onChange={handleEducationChange}
              className="w-full p-3 rounded bg-slate-800 mb-3"
            />



            <input
              type="text"
              name="year"
              placeholder="Passing Year"
              value={education.year}
              onChange={handleEducationChange}
              className="w-full p-3 rounded bg-slate-800 mb-4"
            />



            <button
              onClick={addEducation}
              className="bg-cyan-500 text-black px-5 py-3 rounded-lg font-bold"
            >
              Add Education
            </button>


          </div>





          {/* PROJECTS */}


          <div className="border-t border-slate-700 pt-6 mt-8">


            <h2 className="text-2xl font-bold mb-4">
              Projects
            </h2>



            <input
              type="text"
              name="title"
              placeholder="Project Name"
              value={project.title}
              onChange={handleProjectChange}
              className="w-full p-3 rounded bg-slate-800 mb-3"
            />



            <input
              type="text"
              name="tech"
              placeholder="Technologies Used"
              value={project.tech}
              onChange={handleProjectChange}
              className="w-full p-3 rounded bg-slate-800 mb-3"
            />



            <textarea
              name="description"
              placeholder="Project Description"
              value={project.description}
              onChange={handleProjectChange}
              rows="3"
              className="w-full p-3 rounded bg-slate-800 mb-3"
            />



            <input
              type="text"
              name="github"
              placeholder="GitHub Link"
              value={project.github}
              onChange={handleProjectChange}
              className="w-full p-3 rounded bg-slate-800 mb-4"
            />



            <button
              onClick={addProject}
              className="bg-cyan-500 text-black px-5 py-3 rounded-lg font-bold"
            >
              Add Project
            </button>


          </div>




          {/* LANGUAGES */}


          <div className="border-t border-slate-700 pt-6 mt-8">


            <h2 className="text-2xl font-bold mb-4">
              Languages
            </h2>



            <input
              type="text"
              placeholder="English"
              value={language}
              onChange={(e)=>setLanguage(e.target.value)}
              className="w-full p-3 rounded bg-slate-800 mb-4"
            />



            <button
              onClick={addLanguage}
              className="bg-cyan-500 text-black px-5 py-3 rounded-lg font-bold"
            >
              Add Language
            </button>


          </div>




          {/* CERTIFICATES */}


          <div className="border-t border-slate-700 pt-6 mt-8">


            <h2 className="text-2xl font-bold mb-4">
              Certifications
            </h2>



            <input
              type="text"
              name="title"
              placeholder="Certificate Name"
              value={certificate.title}
              onChange={handleCertificateChange}
              className="w-full p-3 rounded bg-slate-800 mb-3"
            />



            <input
              type="text"
              name="issuer"
              placeholder="Issued By"
              value={certificate.issuer}
              onChange={handleCertificateChange}
              className="w-full p-3 rounded bg-slate-800 mb-3"
            />



            <input
              type="text"
              name="year"
              placeholder="Year"
              value={certificate.year}
              onChange={handleCertificateChange}
              className="w-full p-3 rounded bg-slate-800 mb-4"
            />



            <button
              onClick={addCertificate}
              className="bg-cyan-500 text-black px-5 py-3 rounded-lg font-bold"
            >
              Add Certificate
            </button>


          </div>


        </div>


      </div>
            {/* RIGHT SIDE - RESUME PREVIEW */}


      <div
        ref={resumeRef}
        className="bg-white text-black rounded-xl p-8 shadow-xl"
      >


        <h1 className="text-3xl font-bold">
          {resume.fullName || "Your Name"}
        </h1>


        <p>{resume.email}</p>
        <p>{resume.phone}</p>
        <p>{resume.address}</p>


        {resume.linkedin && (
          <p>{resume.linkedin}</p>
        )}


        {resume.github && (
          <p>{resume.github}</p>
        )}


        {resume.portfolio && (
          <p>{resume.portfolio}</p>
        )}



        <hr className="my-6" />



        {/* OBJECTIVE */}


        <h2 className="text-xl font-bold">
          Career Objective
        </h2>


        <p className="mt-2 whitespace-pre-line">
          {resume.objective ||
          "Your career objective will appear here..."}
        </p>



        <hr className="my-6" />



        {/* EDUCATION */}


        <h2 className="text-xl font-bold">
          Education
        </h2>



        {
          resume.education.length === 0 ? (

            <p className="text-gray-500">
              No education added.
            </p>

          ) : (

            resume.education.map((item,index)=>(

              <div
                key={index}
                className="border rounded p-4 mt-4"
              >

                <h3 className="font-bold">
                  {item.degree}
                </h3>


                <p>
                  {item.college}
                </p>


                <p>
                  CGPA : {item.cgpa}
                </p>


                <p>
                  Passing Year : {item.year}
                </p>


              </div>

            ))

          )
        }



        <hr className="my-6" />




        {/* SKILLS */}


        <h2 className="text-xl font-bold">
          Skills
        </h2>


        <p className="whitespace-pre-line">
          {resume.skills ||
          "No skills added."}
        </p>




        <hr className="my-6" />




        {/* PROJECTS */}


        <h2 className="text-xl font-bold">
          Projects
        </h2>



        {
          resume.projects.map((item,index)=>(


            <div
              key={index}
              className="border rounded p-4 mt-4"
            >


              <h3 className="font-bold">
                {item.title}
              </h3>


              <p>
                <strong>
                  Technologies:
                </strong>{" "}
                {item.tech}
              </p>


              <p>
                {item.description}
              </p>



              {
                item.github && (

                  <p>
                    {item.github}
                  </p>

                )
              }


            </div>


          ))
        }





        <hr className="my-6" />





        {/* LANGUAGES */}



        <h2 className="text-xl font-bold">
          Languages
        </h2>



        <ul className="list-disc ml-6">


        {
          resume.languages.map((lang,index)=>(

            <li key={index}>
              {lang}
            </li>

          ))
        }


        </ul>





        <hr className="my-6" />





        {/* CERTIFICATIONS */}



        <h2 className="text-xl font-bold">
          Certifications
        </h2>



        {
          resume.certifications.map((item,index)=>(


            <div
              key={index}
              className="mt-3"
            >

              <p>
                <strong>
                  {item.title}
                </strong>
              </p>


              <p>
                {item.issuer}
              </p>


              <p>
                {item.year}
              </p>


            </div>


          ))
        }



      </div>


    </div>
   {/* BUTTONS */}

    <div className="mt-8 space-y-4">

      <button
        onClick={saveResume}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold"
      >
        Save Resume
      </button>


      <button
        onClick={downloadResume}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-bold"
      >
        Download Resume PDF
      </button>

    </div>


  </div>
  );
}

export default ResumeCreator;



   