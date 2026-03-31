import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

const QUIZ_DATA = [
  { topic: "HTML Basics", questions: [
    { q: "What does HTML stand for?", options: ["HyperText Markup Language","High Tech Modern Language","HyperText Modern Links","None"], correct: 0 },
    { q: "Which tag is used for headings?", options: ["<p>","<h1>","<div>","<span>"], correct: 1 },
    { q: "Which tag creates a hyperlink?", options: ["<link>","<href>","<a>","<url>"], correct: 2 },
    { q: "Which tag is used for images?", options: ["<image>","<pic>","<img>","<src>"], correct: 2 },
    { q: "What tag creates a paragraph?", options: ["<para>","<p>","<text>","<div>"], correct: 1 },
  ]},
  { topic: "CSS Layout", questions: [
    { q: "What does CSS stand for?", options: ["Computer Style Sheets","Cascading Style Sheets","Creative Style System","None"], correct: 1 },
    { q: "Which property sets background color?", options: ["color","bg-color","background-color","fill"], correct: 2 },
    { q: "Which display value makes flex layout?", options: ["block","inline","flex","grid"], correct: 2 },
    { q: "How to center a div using flexbox?", options: ["align:center","justify-content:center","margin:center","text-align:center"], correct: 1 },
    { q: "Which unit is relative to viewport width?", options: ["px","em","vw","rem"], correct: 2 },
  ]},
  { topic: "JavaScript", questions: [
    { q: "Which keyword declares a variable?", options: ["var","let","const","All of these"], correct: 3 },
    { q: "What does === check?", options: ["Value only","Type only","Value and type","None"], correct: 2 },
    { q: "Which method adds to end of array?", options: ["push()","pop()","shift()","add()"], correct: 0 },
    { q: "What is a closure?", options: ["A loop","Function inside function with access to outer scope","A class","An object"], correct: 1 },
    { q: "Which is used for async operations?", options: ["async/await","Promise","callback","All of these"], correct: 3 },
  ]},
  { topic: "React Basics", questions: [
    { q: "What is JSX?", options: ["JavaScript XML","Java Syntax Extension","JSON XML","None"], correct: 0 },
    { q: "Which hook manages state?", options: ["useEffect","useState","useRef","useContext"], correct: 1 },
    { q: "What is a prop?", options: ["State variable","Data passed to component","A hook","A class"], correct: 1 },
    { q: "useEffect runs when?", options: ["Before render","After render","During render","Never"], correct: 1 },
    { q: "Virtual DOM is?", options: ["Real browser DOM","Lightweight copy of DOM","A database","CSS framework"], correct: 1 },
  ]},
  { topic: "Node.js API", questions: [
    { q: "Node.js runs on which engine?", options: ["SpiderMonkey","V8","Chakra","Rhino"], correct: 1 },
    { q: "Which module creates HTTP server?", options: ["fs","path","http","url"], correct: 2 },
    { q: "Express is a?", options: ["Database","Web framework","Testing tool","OS"], correct: 1 },
    { q: "npm stands for?", options: ["Node Package Manager","New Project Manager","Node Process Module","None"], correct: 0 },
    { q: "Which method handles GET request in Express?", options: ["app.post()","app.get()","app.put()","app.delete()"], correct: 1 },
  ]},
  { topic: "Firebase", questions: [
    { q: "Firebase is made by?", options: ["Amazon","Google","Microsoft","Meta"], correct: 1 },
    { q: "Firestore is a?", options: ["SQL database","NoSQL database","File storage","Server"], correct: 1 },
    { q: "Which Firebase feature handles login?", options: ["Firestore","Storage","Authentication","Hosting"], correct: 2 },
    { q: "Real-time updates use which method?", options: ["getDoc","onSnapshot","setDoc","addDoc"], correct: 1 },
    { q: "Firebase free tier is called?", options: ["Basic","Starter","Spark","Free"], correct: 2 },
  ]},
  { topic: "REST APIs", questions: [
    { q: "REST stands for?", options: ["Representational State Transfer","Remote Service Tool","Real State Transfer","None"], correct: 0 },
    { q: "Which status code means success?", options: ["404","500","200","301"], correct: 2 },
    { q: "POST request is used to?", options: ["Get data","Create data","Delete data","Update data"], correct: 1 },
    { q: "JSON stands for?", options: ["Java Syntax Object Notation","JavaScript Object Notation","Java Standard Object Notation","None"], correct: 1 },
    { q: "Which HTTP method deletes data?", options: ["GET","POST","DELETE","PUT"], correct: 2 },
  ]},
  { topic: "Git & Deploy", questions: [
    { q: "git init does what?", options: ["Pushes code","Initializes repo","Clones repo","Commits code"], correct: 1 },
    { q: "Which command stages all files?", options: ["git commit","git push","git add .","git pull"], correct: 2 },
    { q: "GitHub is used for?", options: ["Hosting code","Version control","Collaboration","All of these"], correct: 3 },
    { q: "npm run build does?", options: ["Starts dev server","Creates production build","Installs packages","Tests app"], correct: 1 },
    { q: "Vercel is used for?", options: ["Database","Deploying frontend apps","Writing code","Testing"], correct: 1 },
  ]},
  { topic: "Portfolio Project", questions: [
    { q: "What should a portfolio contain?", options: ["Projects only","Skills, projects, contact","Resume only","None"], correct: 1 },
    { q: "Best platform to host portfolio?", options: ["WhatsApp","GitHub Pages","Word document","Email"], correct: 1 },
    { q: "README.md is written in?", options: ["HTML","Markdown","CSS","Python"], correct: 1 },
    { q: "What makes a good project demo?", options: ["Long code","Working app + explanation","Only screenshots","None"], correct: 1 },
    { q: "Which is important for job applications?", options: ["GitHub profile","LinkedIn","Portfolio website","All of these"], correct: 3 },
  ]},
  { topic: "Job Ready", questions: [
    { q: "What is DSA?", options: ["Data Structures & Algorithms","Digital System Architecture","Database System API","None"], correct: 0 },
    { q: "Which platform is best for job search?", options: ["Instagram","LinkedIn","Twitter","Facebook"], correct: 1 },
    { q: "What is a tech interview?", options: ["HR round only","Coding + system design + HR","Only aptitude","Group discussion"], correct: 1 },
    { q: "STAR method is used in?", options: ["Coding","Behavioral interviews","System design","Aptitude"], correct: 1 },
    { q: "What is CTC?", options: ["Cost To Company","Code To Check","Career Training Course","None"], correct: 0 },
  ]},
];

function Quiz() {
  const { index } = useParams();
  const navigate = useNavigate();
  const quiz = QUIZ_DATA[parseInt(index)] || QUIZ_DATA[0];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = quiz.questions[current];

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < quiz.questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      saveScore();
      setDone(true);
    }
  };

  const saveScore = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    const data = snap.data();
    const criGain = score >= 4 ? 5 : score >= 3 ? 3 : 1;
    let newCri = (data.cri || 0) + criGain;
    if (newCri > 100) newCri = 100;
    await updateDoc(userRef, {
      cri: newCri,
      completedQuizzes: arrayUnion(parseInt(index))
    });

    if (analytics) {
      logEvent(analytics, "quiz_submitted");
    }
  };

  if (done) return (
    <div className="app-wrapper">
      <div className="quiz-result">
        <div className="result-emoji">
          {score === 5 ? "🏆" : score >= 3 ? "🎯" : "💪"}
        </div>
        <h2>Quiz Complete!</h2>
        <div className="result-score">{score} / {quiz.questions.length}</div>
        <p className="result-msg">
          {score === 5 ? "Perfect score! +5 CRI 🔥" :
           score >= 3 ? "Good job! +3 CRI 👍" :
           "Keep practicing! +1 CRI 💡"}
        </p>
        <button className="primary-btn" onClick={() => navigate("/roadmap")}>
          Back to Roadmap
        </button>
        <button className="primary-btn"
          style={{ background: "rgba(255,255,255,0.06)", boxShadow: "none", border: "1px solid rgba(255,255,255,0.1)", marginTop: "10px" }}
          onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="app-wrapper">
      <div className="top-bar">
        <h2>🧠 {quiz.topic} Quiz</h2>
        <button className="back-btn" onClick={() => navigate(`/learn/${index}`)}>← Back</button>
      </div>

      <div className="quiz-wrap">
        <div className="quiz-progress">
          <span>Question {current + 1} of {quiz.questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill"
            style={{ width: `${((current) / quiz.questions.length) * 100}%` }}
          />
        </div>

        <div className="quiz-question">{q.q}</div>

        <div className="quiz-options">
          {q.options.map((opt, i) => {
            let cls = "quiz-option";
            if (answered) {
              if (i === q.correct) cls += " correct";
              else if (i === selected) cls += " wrong";
            }
            if (selected === i) cls += " selected";
            return (
              <div key={i} className={cls} onClick={() => handleSelect(i)}>
                <span className="option-letter">{["A","B","C","D"][i]}</span>
                {opt}
              </div>
            );
          })}
        </div>

        {answered && (
          <button className="primary-btn" onClick={handleNext}>
            {current + 1 < quiz.questions.length ? "Next Question →" : "See Results 🏆"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;