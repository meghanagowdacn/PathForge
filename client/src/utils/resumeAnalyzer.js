const skillsDatabase = [
  "html",
  "css",
  "javascript",
  "react",
  "node",
  "express",
  "mongodb",
  "sql",
  "python",
  "java",
  "git",
  "github",
  "firebase",
  "tailwind",
  "bootstrap",
  "typescript",
];


export function analyzeResume(text) {

  const resumeText = text.toLowerCase();


  const foundSkills = skillsDatabase.filter(skill =>
    resumeText.includes(skill)
  );


  const missingSkills = skillsDatabase.filter(skill =>
    !resumeText.includes(skill)
  );


  const score = Math.min(
    Math.round((foundSkills.length / skillsDatabase.length) * 100),
    100
  );


  let readiness;

  if(score >= 80){
    readiness = "Excellent Placement Ready";
  }
  else if(score >= 60){
    readiness = "Good, but needs improvement";
  }
  else{
    readiness = "Needs more skills and projects";
  }


  return {

    score,

    readiness,

    foundSkills,

    missingSkills: missingSkills.slice(0,5),

    certifications:[
      "Full Stack Development",
      "Cloud Fundamentals",
      "Database Management"
    ],

    projects:[
      "AI Interview Preparation Platform",
      "Student Productivity Dashboard",
      "Developer Portfolio"
    ],

    tips:[
      "Add more technical skills",
      "Include GitHub projects",
      "Add measurable achievements",
      "Improve project descriptions"
    ]

  };

}