import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { analyzeResume } from "../../utils/resumeAnalyzer";
import { auth, db } from "../../firebase";

import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function AIResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // EXTRACT TEXT FROM PDF
  // ==========================================

  const extractTextFromPDF = async (selectedFile) => {
    const arrayBuffer = await selectedFile.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let text = "";

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      const page = await pdf.getPage(pageNumber);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      text += pageText + "\n";
    }

    return text;
  };

  // ==========================================
  // SAVE ANALYSIS TO FIREBASE
  // ==========================================

  const saveAnalysisToFirebase = async (analysis) => {
    try {
      setSaving(true);

      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error(
          "User is not logged in. Please login again."
        );
      }

      // Get Firebase authentication token
      const token = await currentUser.getIdToken();

      const resumeData = {
        score:
          typeof analysis.score === "number"
            ? analysis.score
            : 0,

        readiness:
          analysis.readiness || "",

        foundSkills:
          Array.isArray(analysis.foundSkills)
            ? analysis.foundSkills
            : [],

        missingSkills:
          Array.isArray(analysis.missingSkills)
            ? analysis.missingSkills
            : [],

        certifications:
          Array.isArray(analysis.certifications)
            ? analysis.certifications
            : [],

        projects:
          Array.isArray(analysis.projects)
            ? analysis.projects
            : [],

        tips:
          Array.isArray(analysis.tips)
            ? analysis.tips
            : [],
      };

      console.log(
        "📤 Sending resume analysis to backend..."
      );

      const response = await fetch(
        "https://pathforge-backend-83wc.onrender.com/api/user/resume",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(resumeData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save resume analysis"
        );
      }

      console.log(
        "✅ Resume analysis saved to Firebase:",
        data
      );

      return data;
    } catch (error) {
      console.error(
        "❌ Firebase resume save error:",
        error
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // ANALYZE RESUME
  // ==========================================

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload your resume PDF.");
      return;
    }

    try {
      setLoading(true);

      console.log(
        "📄 Reading resume:",
        file.name
      );

      // Extract PDF text
      const resumeText =
        await extractTextFromPDF(file);

      if (!resumeText.trim()) {
        alert(
          "Could not extract text from this PDF. Please upload a text-based resume PDF."
        );

        return;
      }

      console.log(
        "✅ Resume text extracted"
      );

      // Analyze resume
      const analysis =
        analyzeResume(resumeText);

      console.log(
        "📊 Resume analysis:",
        analysis
      );

      // Show result immediately
      setResult(analysis);

      // Save to Firebase
      await saveAnalysisToFirebase(
        analysis
      );

      alert(
        "Resume analyzed and saved successfully!"
      );
    } catch (error) {
      console.error(
        "❌ Resume analysis error:",
        error
      );

      alert(
        error.message ||
          "Unable to analyze resume. Please make sure you uploaded a valid PDF."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SCORE MESSAGE
  // ==========================================

  const getScoreMessage = (score) => {
    if (score >= 90) {
      return "Excellent";
    }

    if (score >= 75) {
      return "Very Good";
    }

    if (score >= 60) {
      return "Good";
    }

    return "Needs Improvement";
  };

  // ==========================================
  // SCORE COLOR
  // ==========================================

  const getScoreColor = (score) => {
    if (score >= 80) {
      return "text-green-400";
    }

    if (score >= 60) {
      return "text-yellow-400";
    }

    return "text-red-400";
  };

  // ==========================================
  // FILE SELECT
  // ==========================================

  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files?.[0] || null;

    if (!selectedFile) {
      return;
    }

    if (
      selectedFile.type !==
      "application/pdf"
    ) {
      alert(
        "Please select a PDF file."
      );

      event.target.value = "";

      return;
    }

    setFile(selectedFile);
    setResult(null);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen text-white">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8">

        <p className="text-cyan-400 text-sm font-semibold">
          CAREER TOOL
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">
          AI Resume Analyzer
        </h1>

        <p className="text-gray-400 mt-3 max-w-2xl">
          Upload your resume and get a quick
          analysis of your skills, readiness,
          missing areas, projects, and
          improvement opportunities.
        </p>

      </div>

      {/* ==========================================
          UPLOAD CARD
      ========================================== */}

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h2 className="text-xl md:text-2xl font-bold text-white">
              Upload Your Resume
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Upload a text-based PDF resume
              for analysis.
            </p>

          </div>

          <div className="text-sm text-gray-500">
            PDF only
          </div>

        </div>

        {/* FILE UPLOAD */}

        <label className="mt-6 block cursor-pointer">

          <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-8 text-center transition">

            <div className="text-5xl mb-4">
              📄
            </div>

            <p className="text-gray-200 font-semibold">
              {file
                ? file.name
                : "Choose your resume PDF"}
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Click here to select a PDF file
            </p>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

          </div>

        </label>

        {/* FILE INFORMATION */}

        {file && (
          <div className="mt-5 bg-slate-800/70 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>

              <p className="text-gray-200 font-medium">
                {file.name}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                {(file.size / 1024 / 1024).toFixed(
                  2
                )}{" "}
                MB
              </p>

            </div>

            <span className="text-green-400 text-sm font-semibold">
              ✓ PDF selected
            </span>

          </div>
        )}

        {/* ANALYZE BUTTON */}

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={
            loading ||
            saving ||
            !file
          }
          className="w-full mt-5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold px-6 py-3.5 rounded-xl transition"
        >
          {loading
            ? "Analyzing Resume..."
            : saving
            ? "Saving to Firebase..."
            : "Analyze Resume"}
        </button>

      </div>

      {/* ==========================================
          RESULTS
      ========================================== */}

      {result && (
        <div className="mt-10 space-y-6">

          {/* RESULTS HEADER */}

          <div>

            <p className="text-cyan-400 text-sm font-semibold">
              ANALYSIS COMPLETE
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Resume Analysis
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Your resume analysis has been
              saved to Firebase.
            </p>

          </div>

          {/* ==========================================
              SCORE + READINESS
          ========================================== */}

          <div className="grid lg:grid-cols-2 gap-6">

            {/* SCORE */}

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    RESUME SCORE
                  </p>

                  <h3 className="text-xl font-bold text-white mt-1">
                    Overall Strength
                  </h3>

                </div>

                <span className="text-2xl">
                  📊
                </span>

              </div>

              <div className="mt-8 flex items-end gap-3">

                <p
                  className={`text-6xl font-bold ${getScoreColor(
                    result.score
                  )}`}
                >
                  {result.score}%
                </p>

                <p className="text-gray-400 mb-2">
                  {getScoreMessage(
                    result.score
                  )}
                </p>

              </div>

              <div className="w-full bg-slate-800 rounded-full h-3 mt-6 overflow-hidden">

                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.score >= 80
                      ? "bg-green-400"
                      : result.score >= 60
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                  style={{
                    width: `${result.score}%`,
                  }}
                />

              </div>

            </div>

            {/* READINESS */}

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">

              <p className="text-gray-500 text-sm">
                PLACEMENT READINESS
              </p>

              <h3 className="text-xl font-bold text-white mt-1">
                Career Readiness
              </h3>

              <div className="mt-6 bg-slate-800/70 border border-slate-700 rounded-xl p-5">

                <p className="text-gray-300 leading-7">
                  {result.readiness}
                </p>

              </div>

            </div>

          </div>

          {/* ==========================================
              SKILLS
          ========================================== */}

          <div className="grid lg:grid-cols-2 gap-6">

            {/* FOUND SKILLS */}

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-bold text-white">
                  Skills Found
                </h3>

                <span className="text-green-400">
                  ✓
                </span>

              </div>

              {result.foundSkills?.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-5">

                  {result.foundSkills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-2 rounded-lg text-sm"
                      >
                        ✓ {skill}
                      </span>
                    )
                  )}

                </div>
              ) : (
                <p className="text-gray-500 mt-5">
                  No matching skills found.
                </p>
              )}

            </div>

            {/* MISSING SKILLS */}

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-bold text-white">
                  Missing Skills
                </h3>

                <span className="text-yellow-400">
                  !
                </span>

              </div>

              {result.missingSkills?.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-5">

                  {result.missingSkills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-3 py-2 rounded-lg text-sm"
                      >
                        + {skill}
                      </span>
                    )
                  )}

                </div>
              ) : (
                <p className="text-green-400 mt-5">
                  ✓ No major missing skills
                  detected.
                </p>
              )}

            </div>

          </div>

          {/* ==========================================
              RECOMMENDATIONS
          ========================================== */}

          <div className="grid lg:grid-cols-3 gap-6">

            {/* CERTIFICATIONS */}

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">

              <div className="text-3xl mb-4">
                🎓
              </div>

              <h3 className="text-xl font-bold text-white">
                Recommended Certifications
              </h3>

              {result.certifications?.length > 0 ? (
                <ul className="mt-5 space-y-3">

                  {result.certifications.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="text-gray-300 text-sm leading-6"
                      >
                        <span className="text-cyan-400 mr-2">
                          •
                        </span>

                        {item}
                      </li>
                    )
                  )}

                </ul>
              ) : (
                <p className="text-gray-500 mt-4 text-sm">
                  No certification
                  recommendations.
                </p>
              )}

            </div>

            {/* PROJECTS */}

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">

              <div className="text-3xl mb-4">
                🚀
              </div>

              <h3 className="text-xl font-bold text-white">
                Suggested Projects
              </h3>

              {result.projects?.length > 0 ? (
                <ul className="mt-5 space-y-3">

                  {result.projects.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="text-gray-300 text-sm leading-6"
                      >
                        <span className="text-cyan-400 mr-2">
                          •
                        </span>

                        {item}
                      </li>
                    )
                  )}

                </ul>
              ) : (
                <p className="text-gray-500 mt-4 text-sm">
                  No project
                  recommendations.
                </p>
              )}

            </div>

            {/* TIPS */}

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">

              <div className="text-3xl mb-4">
                💡
              </div>

              <h3 className="text-xl font-bold text-white">
                Improvement Tips
              </h3>

              {result.tips?.length > 0 ? (
                <ul className="mt-5 space-y-3">

                  {result.tips.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="text-gray-300 text-sm leading-6"
                      >
                        <span className="text-cyan-400 mr-2">
                          •
                        </span>

                        {item}
                      </li>
                    )
                  )}

                </ul>
              ) : (
                <p className="text-gray-500 mt-4 text-sm">
                  No additional tips.
                </p>
              )}

            </div>

          </div>

          {/* ==========================================
              FIREBASE STATUS
          ========================================== */}

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-5 py-4">

            <p className="text-green-400 text-sm font-semibold">
              ✓ Resume analysis saved to Firebase
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Your latest analysis is stored in
              your user account.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default AIResumeAnalyzer;