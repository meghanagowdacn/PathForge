import { useState } from "react";

const questions = [
  {
    question: "What is PathForge?",
    answer:
      "PathForge is a career guidance platform that helps students choose career paths, learn required skills, track progress, and become placement ready.",
  },
  {
    question: "Who can use PathForge?",
    answer:
      "PathForge is designed for students, fresh graduates, and anyone who wants a structured roadmap to improve their career skills.",
  },
  {
    question: "How does the career roadmap work?",
    answer:
      "You select your desired career role, and PathForge provides the required skills, projects, learning path, and interview preparation guidance.",
  },
  {
    question: "Does PathForge provide interview preparation?",
    answer:
      "Yes. PathForge helps users practice interview questions and improve their confidence before placement opportunities.",
  },
  {
    question: "Can I track my learning progress?",
    answer:
      "Yes. The dashboard will allow users to monitor completed skills, projects, and overall placement readiness.",
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-5xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Everything you need to know about PathForge.
        </p>


        <div className="space-y-6">

          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 cursor-pointer"
              onClick={() =>
                setActiveIndex(
                  activeIndex === index ? null : index
                )
              }
            >

              <div className="flex justify-between items-center">

                <h3 className="text-xl font-bold">
                  {item.question}
                </h3>

                <span className="text-cyan-400 text-2xl">
                  {activeIndex === index ? "-" : "+"}
                </span>

              </div>


              {activeIndex === index && (
                <p className="text-gray-400 mt-4 leading-relaxed">
                  {item.answer}
                </p>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;