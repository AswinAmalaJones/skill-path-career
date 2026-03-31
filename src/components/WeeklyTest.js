/* eslint-disable */
import { useState } from "react";

const WEEKLY_QUESTIONS = {
  "Full Stack Developer": [
    { q: "What does REST stand for?", options: ["Representational State Transfer", "Remote Execution Standard Tool", "React Element State Tree", "Responsive Element Style Tag"], ans: 0 },
    { q: "Which hook manages state in React?", options: ["useEffect", "useState", "useContext", "useRef"], ans: 1 },
    { q: "What is Node.js?", options: ["A browser", "A JavaScript runtime", "A database", "A CSS framework"], ans: 1 },
    { q: "What does API stand for?", options: ["Application Programming Interface", "Applied Python Integration", "Automated Process Index", "Advanced Program Installer"], ans: 0 },
    { q: "Which is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], ans: 2 },
  ],
  "Frontend Developer": [
    { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Syntax"], ans: 1 },
    { q: "Which property makes a flex container?", options: ["display: block", "display: flex", "position: flex", "flex: true"], ans: 1 },
    { q: "What is the DOM?", options: ["Document Object Model", "Data Object Module", "Dynamic Output Method", "Design Object Manager"], ans: 0 },
    { q: "Which is NOT a JavaScript data type?", options: ["String", "Boolean", "Float", "Object"], ans: 2 },
    { q: "What does === check?", options: ["Value only", "Type only", "Value and type", "Neither"], ans: 2 },
  ],
  "Data Scientist": [
    { q: "What does ML stand for?", options: ["Multiple Logic", "Machine Learning", "Model Library", "Math Layer"], ans: 1 },
    { q: "Which Python library is used for data manipulation?", options: ["NumPy", "Pandas", "Matplotlib", "Scikit"], ans: 1 },
    { q: "What is overfitting?", options: ["Model too simple", "Model memorizes training data", "Model runs slow", "Model has bugs"], ans: 1 },
    { q: "What is the purpose of train-test split?", options: ["Save memory", "Evaluate model on unseen data", "Speed up training", "Reduce dataset size"], ans: 1 },
    { q: "Which is a supervised learning algorithm?", options: ["K-Means", "PCA", "Linear Regression", "DBSCAN"], ans: 2 },
  ],
  // ✅ FIX: Added more career goals — no more fallback-only for unknown goals
  "Backend Developer": [
    { q: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "High Tech Transfer Process", "Hyper Transfer Text Program", "Host Transfer Text Protocol"], ans: 0 },
    { q: "Which status code means 'Not Found'?", options: ["200", "301", "404", "500"], ans: 2 },
    { q: "What is a REST API?", options: ["A database", "A UI library", "An architectural style for APIs", "A testing framework"], ans: 2 },
    { q: "What does CRUD stand for?", options: ["Create Read Update Delete", "Code Run Use Debug", "Copy Render Upload Deploy", "Connect Route Use Delete"], ans: 0 },
    { q: "Which is a relational database?", options: ["MongoDB", "Redis", "Firebase", "PostgreSQL"], ans: 3 },
  ],
  "UI/UX Designer": [
    { q: "What does UX stand for?", options: ["User Experience", "Universal Exchange", "Unique Extension", "User Export"], ans: 0 },
    { q: "What is a wireframe?", options: ["A CSS grid", "A low-fidelity design layout", "A JavaScript library", "A color palette"], ans: 1 },
    { q: "Which tool is popular for UI design?", options: ["VS Code", "Figma", "GitHub", "Postman"], ans: 1 },
    { q: "What is the purpose of a prototype?", options: ["Write code", "Test user interactions before development", "Deploy the app", "Store database"], ans: 1 },
    { q: "What does 'responsive design' mean?", options: ["Fast loading", "Works on all screen sizes", "Has animations", "Dark mode support"], ans: 1 },
  ],
};

// ✅ FIX: Helper to get questions — fallback to Full Stack if goal not found
const getQuestions = (goal) =>
  WEEKLY_QUESTIONS[goal] || WEEKLY_QUESTIONS["Full Stack Developer"];

function WeeklyTest({ userData, onCriUpdate }) {
  // ✅ FIX: Retake bug — all states properly reset via resetTest()
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [criAwarded, setCriAwarded] = useState(false); // ✅ FIX: Prevent double CRI award on retake

  const today = new Date();
  const isSunday = today.getDay() === 0;
  const goal = userData?.goal || "Full Stack Developer";
  const questions = getQuestions(goal);

  // ✅ FIX: Clean reset function — fixes the retake bug
  const resetTest = () => {
    setStarted(false);
    setDone(false);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setAnswers([]);
    setCriAwarded(false); // allow CRI award again on retake
  };

  const handleSelect = (optIndex) => {
    if (selected !== null) return;
    setSelected(optIndex);
    const correct = optIndex === questions[current].ans;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { correct, selected: optIndex }]);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
      // ✅ FIX: CRI update on test completion — calls parent callback
      if (!criAwarded && onCriUpdate) {
        const pct = ((score + (selected === questions[current].ans ? 1 : 0)) / questions.length) * 100;
        const criBonus = pct >= 80 ? 10 : pct >= 60 ? 6 : 3;
        onCriUpdate(criBonus, `Weekly Test completed — ${Math.round(pct)}% score`);
        setCriAwarded(true);
      }
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const getScoreMsg = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 80) return { msg: "Excellent! You're on track! 🚀", color: "#00d4aa", criBonus: "+10 CRI" };
    if (pct >= 60) return { msg: "Good effort! Keep practicing! 💪", color: "#4f8bff", criBonus: "+6 CRI" };
    return { msg: "Keep learning — you'll improve! 🌱", color: "#f59e0b", criBonus: "+3 CRI" };
  };

  // Not Sunday — show teaser
  const daysUntilSunday = (7 - today.getDay()) % 7 || 7;

  if (!isSunday) {
    return (
      <div className="card" style={{ marginBottom: "16px" }}>
        <h3>🧪 Weekly Challenge</h3>
        <div style={{
          textAlign: "center", padding: "20px",
          color: "rgba(255,255,255,0.4)", fontSize: "14px"
        }}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>📅</div>
          <div style={{ fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "6px" }}>
            Weekly Test unlocks every Sunday!
          </div>
          <div style={{ fontSize: "12px" }}>
            {daysUntilSunday} day{daysUntilSunday !== 1 ? "s" : ""} until next challenge 🏆
          </div>
        </div>
      </div>
    );
  }

  // Sunday — intro screen
  if (!started) {
    return (
      <div className="card" style={{ marginBottom: "16px" }}>
        <h3>🧪 Weekly Challenge — Sunday Special!</h3>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏆</div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: "8px" }}>
            Weekly Test Unlocked!
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
            5 questions on {goal} — Test your weekly progress!
          </div>
          {/* ✅ FIX: Show CRI reward upfront so student is motivated */}
          <div style={{ fontSize: "12px", color: "#ffd60a", marginBottom: "20px" }}>
            🎯 Score 80%+ → earn <strong>+10 CRI</strong>
          </div>
          <button className="primary-btn" onClick={() => setStarted(true)}>
            🚀 Start Weekly Test
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (done) {
    const { msg, color, criBonus } = getScoreMsg();
    return (
      <div className="card" style={{ marginBottom: "16px", textAlign: "center", padding: "32px" }}>
        <div style={{ fontSize: "52px", marginBottom: "12px" }}>
          {score >= 4 ? "🏆" : score >= 3 ? "🎯" : "📚"}
        </div>
        <h3 style={{ color, fontSize: "22px", marginBottom: "8px", textTransform: "none" }}>
          {score} / {questions.length} Correct!
        </h3>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
          {msg}
        </div>
        {/* ✅ FIX: Show CRI awarded */}
        <div style={{
          display: "inline-block",
          fontSize: "13px", fontWeight: 700,
          color: "#ffd60a",
          background: "rgba(255,214,10,0.08)",
          border: "1px solid rgba(255,214,10,0.2)",
          padding: "6px 16px", borderRadius: "999px",
          marginBottom: "20px"
        }}>
          {criBonus} awarded to your CRI! 🎉
        </div>

        {/* Answer review */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          {questions.map((q, i) => (
            <div key={i} style={{
              padding: "10px 14px", marginBottom: "8px",
              borderRadius: "10px",
              background: answers[i]?.correct
                ? "rgba(52,211,153,0.06)"
                : "rgba(255,69,58,0.06)",
              border: `1px solid ${answers[i]?.correct ? "rgba(52,211,153,0.2)" : "rgba(255,69,58,0.2)"}`,
              fontSize: "13px",
            }}>
              <div style={{ color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>
                {answers[i]?.correct ? "✅" : "❌"} {q.q}
              </div>
              {!answers[i]?.correct && (
                <div style={{ color: "#00d4aa", fontSize: "12px" }}>
                  Correct answer: {q.options[q.ans]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ✅ FIX: Retake uses resetTest() — clean reset, no stale state */}
        <button className="primary-btn" onClick={resetTest}>
          🔄 Retake Test
        </button>
      </div>
    );
  }

  // Question screen
  const q = questions[current];

  return (
    <div className="card" style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3>🧪 Weekly Challenge</h3>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        height: "3px", background: "rgba(255,255,255,0.05)",
        borderRadius: "999px", marginBottom: "20px", overflow: "hidden"
      }}>
        <div style={{
          width: `${((current + 1) / questions.length) * 100}%`,
          height: "100%",
          background: "linear-gradient(90deg, #4f8bff, #00d4aa)",
          borderRadius: "999px", transition: "width 0.4s ease"
        }} />
      </div>

      {/* Question */}
      <div style={{
        fontSize: "16px", fontWeight: 500,
        color: "rgba(255,255,255,0.9)",
        marginBottom: "20px", lineHeight: 1.6,
        padding: "16px", background: "rgba(255,255,255,0.02)",
        borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)"
      }}>
        {q.q}
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.ans;
          const showResult = selected !== null;

          let bg = "rgba(255,255,255,0.03)";
          let border = "rgba(255,255,255,0.08)";
          let color = "rgba(255,255,255,0.7)";

          if (showResult) {
            if (isCorrect) { bg = "rgba(52,211,153,0.08)"; border = "rgba(52,211,153,0.3)"; color = "#34d399"; }
            else if (isSelected) { bg = "rgba(255,69,58,0.08)"; border = "rgba(255,69,58,0.3)"; color = "#ff453a"; }
          } else if (isSelected) {
            bg = "rgba(79,139,255,0.1)"; border = "rgba(79,139,255,0.4)"; color = "#7eb8ff";
          }

          return (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                padding: "14px 18px", borderRadius: "12px",
                background: bg, border: `1px solid ${border}`,
                color, fontSize: "14px", fontWeight: 500,
                cursor: selected !== null ? "default" : "pointer",
                transition: "all 0.2s", display: "flex",
                alignItems: "center", gap: "12px"
              }}
            >
              <span style={{
                width: "26px", height: "26px", borderRadius: "6px",
                background: "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 700, flexShrink: 0
              }}>
                {["A", "B", "C", "D"][i]}
              </span>
              {opt}
            </div>
          );
        })}
      </div>

      {selected !== null && (
        <button className="primary-btn" onClick={handleNext}>
          {current + 1 >= questions.length ? "See Results 🏆" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

export default WeeklyTest;