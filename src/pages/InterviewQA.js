/* eslint-disable */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const INTERVIEW_DATA = {
  "Full Stack Developer": [
    { q: "What is REST API?", a: "REST (Representational State Transfer) is an architectural style for APIs. It uses HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove). REST APIs are stateless — each request contains all info needed.", keywords: ["REST", "HTTP", "stateless", "GET", "POST", "PUT", "DELETE"] },
    { q: "Explain Virtual DOM in React.", a: "Virtual DOM is a lightweight copy of the real DOM. When state changes, React updates the Virtual DOM first, compares it with previous version (diffing), then updates only changed parts in real DOM. This makes React fast.", keywords: ["Virtual DOM", "diffing", "real DOM", "state", "lightweight"] },
    { q: "What is the difference between SQL and NoSQL?", a: "SQL databases are relational, use tables with fixed schema (MySQL, PostgreSQL). NoSQL databases are non-relational, flexible schema (MongoDB, Firebase). SQL = structured data, NoSQL = unstructured/flexible data.", keywords: ["relational", "non-relational", "schema", "MySQL", "MongoDB", "structured"] },
    { q: "What is Node.js?", a: "Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows running JavaScript on the server side. It's non-blocking, event-driven, and great for real-time applications and APIs.", keywords: ["runtime", "V8", "server", "non-blocking", "event-driven"] },
    { q: "Explain useState and useEffect hooks.", a: "useState manages component state. useEffect handles side effects like API calls, subscriptions, timers. useEffect runs after render — dependency array controls when it runs.", keywords: ["useState", "useEffect", "state", "side effects", "dependency array"] },
    { q: "What is CORS?", a: "Cross-Origin Resource Sharing. A security feature that restricts web pages from making requests to different domains. Servers must send CORS headers to allow cross-origin requests.", keywords: ["Cross-Origin", "security", "domains", "headers", "requests"] },
    { q: "What is JWT?", a: "JSON Web Token — used for authentication. Contains header, payload, signature. Server creates token on login, client sends it with each request. Stateless authentication — no server-side session needed.", keywords: ["JSON Web Token", "authentication", "header", "payload", "signature", "stateless"] },
    { q: "What is the difference between GET and POST?", a: "GET retrieves data, parameters in URL, cached, limited size. POST sends data in body, not cached, used for creating/submitting data, no size limit.", keywords: ["GET", "POST", "URL", "body", "cached", "size"] },
    { q: "What is MongoDB?", a: "MongoDB is a NoSQL document database. Stores data as JSON-like documents (BSON). Flexible schema, horizontally scalable, great for unstructured data and rapid development.", keywords: ["NoSQL", "document", "BSON", "flexible schema", "scalable"] },
    { q: "Explain React component lifecycle.", a: "Mounting: component created → render → DOM update → componentDidMount. Updating: state/props change → render → DOM update. Unmounting: componentWillUnmount. In hooks: useEffect handles all lifecycle.", keywords: ["Mounting", "Unmounting", "componentDidMount", "useEffect", "props", "lifecycle"] },
  ],
  "Frontend Developer": [
    { q: "What is the Box Model in CSS?", a: "Every HTML element is a box with: Content, Padding, Border, Margin. box-sizing: border-box includes padding+border in width.", keywords: ["Content", "Padding", "Border", "Margin", "box-sizing"] },
    { q: "What is Flexbox?", a: "CSS layout model for one-dimensional layouts. justify-content (main axis), align-items (cross axis), flex-wrap, flex-direction.", keywords: ["flex", "justify-content", "align-items", "one-dimensional", "flex-direction"] },
    { q: "What is CSS Grid?", a: "Two-dimensional layout system. display: grid. grid-template-columns/rows define structure.", keywords: ["grid", "two-dimensional", "rows", "columns", "grid-template"] },
    { q: "What is the difference between == and ===?", a: "== loose equality with type conversion. === strict equality checks value AND type. Always use ===.", keywords: ["loose", "strict", "type conversion", "===", "=="] },
    { q: "What are Promises in JavaScript?", a: "Promise represents a future value — pending, fulfilled, rejected. .then() success, .catch() errors. async/await is syntactic sugar.", keywords: ["Promise", "pending", "fulfilled", "rejected", "async", "await"] },
    { q: "What is event bubbling?", a: "Event triggers on element then bubbles up to parent elements. stopPropagation() prevents bubbling.", keywords: ["bubbles", "parent", "stopPropagation", "event", "DOM"] },
    { q: "What is localStorage vs sessionStorage?", a: "localStorage persists after browser close. sessionStorage cleared when tab closes. Both ~5MB limit.", keywords: ["localStorage", "sessionStorage", "persists", "tab", "5MB"] },
    { q: "What is a closure?", a: "Function that remembers its outer scope even after outer function returns. Used for data privacy.", keywords: ["outer scope", "returns", "privacy", "function", "remembers"] },
    { q: "What is semantic HTML?", a: "HTML elements that convey meaning: header, nav, main, article, section, footer. Benefits: accessibility, SEO.", keywords: ["semantic", "header", "nav", "accessibility", "SEO", "meaning"] },
    { q: "What is responsive design?", a: "Design that adapts to different screen sizes using media queries, flexible grid, relative units. Mobile-first approach.", keywords: ["media queries", "flexible", "mobile-first", "screen sizes", "rem", "vw"] },
  ],
  "Backend Developer": [
    { q: "What is middleware in Express.js?", a: "Functions in request-response cycle. Access to req, res, next. Used for logging, auth, error handling.", keywords: ["middleware", "req", "res", "next", "logging", "authentication"] },
    { q: "What is database indexing?", a: "Data structure that improves query speed. Faster reads, slower writes, more storage.", keywords: ["index", "query speed", "reads", "writes", "storage"] },
    { q: "What is authentication vs authorization?", a: "Authentication: verifying WHO you are. Authorization: verifying WHAT you can do.", keywords: ["authentication", "authorization", "WHO", "WHAT", "permissions"] },
    { q: "What is a RESTful API?", a: "API following REST principles: stateless, client-server, cacheable. Uses HTTP methods correctly. Status codes: 200, 201, 404, 500.", keywords: ["stateless", "client-server", "cacheable", "HTTP", "status codes"] },
    { q: "What is SQL JOIN?", a: "INNER JOIN: matching rows only. LEFT JOIN: all left + matching right. RIGHT JOIN: all right + matching left.", keywords: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "matching", "rows"] },
    { q: "What is caching?", a: "Storing data temporarily for faster access. Redis is popular in-memory cache. Cache invalidation is the hardest part.", keywords: ["cache", "Redis", "in-memory", "invalidation", "faster"] },
    { q: "What is a microservice?", a: "App split into small independent services. Each has its own database. Benefits: scalability, resilience.", keywords: ["microservice", "independent", "scalability", "resilience", "database"] },
    { q: "What is Docker?", a: "Platform for containerization. Packages app with dependencies into a container. Dockerfile defines container.", keywords: ["Docker", "container", "containerization", "Dockerfile", "dependencies"] },
    { q: "What is async/await?", a: "Syntactic sugar over Promises. async function returns Promise. await pauses execution. Use try/catch.", keywords: ["async", "await", "Promise", "try/catch", "syntactic sugar"] },
    { q: "What is ORM?", a: "Object Relational Mapper — maps database tables to code objects. Examples: Sequelize, Mongoose, Django ORM.", keywords: ["ORM", "mapper", "Sequelize", "Mongoose", "tables", "objects"] },
  ],
  "Data Analyst": [
    { q: "What is a DataFrame in Pandas?", a: "2D labeled data structure like a spreadsheet. Created from CSV, Excel, dict. Key: read_csv(), groupby(), merge().", keywords: ["DataFrame", "2D", "CSV", "groupby", "merge", "spreadsheet"] },
    { q: "What is mean, median, mode?", a: "Mean: average, sensitive to outliers. Median: middle value, robust. Mode: most frequent, used for categorical.", keywords: ["mean", "median", "mode", "outliers", "average", "categorical"] },
    { q: "What is data cleaning?", a: "Fixing/removing incorrect data. Handle nulls (dropna/fillna), remove duplicates, fix data types, handle outliers.", keywords: ["null", "dropna", "fillna", "duplicates", "outliers", "data types"] },
    { q: "What is SQL GROUP BY?", a: "Groups rows with same values. Used with COUNT, SUM, AVG, MAX, MIN. HAVING filters groups.", keywords: ["GROUP BY", "COUNT", "SUM", "AVG", "HAVING", "aggregate"] },
    { q: "What is a pivot table?", a: "Summary table reorganizing and aggregating data. Rows, Columns, Values dimensions. df.pivot_table() in Pandas.", keywords: ["pivot", "aggregate", "rows", "columns", "summary", "pivot_table"] },
    { q: "What is correlation?", a: "Statistical measure of relationship. Range -1 to +1. Correlation ≠ causation. df.corr() in Pandas.", keywords: ["correlation", "-1", "+1", "causation", "relationship", "statistical"] },
    { q: "What is data visualization?", a: "Graphical representation of data. Bar, line, pie, scatter, histogram. Libraries: Matplotlib, Seaborn, Plotly.", keywords: ["visualization", "bar", "scatter", "histogram", "Matplotlib", "Seaborn"] },
    { q: "What is an outlier?", a: "Data point significantly different from others. Detection: IQR, Z-score, box plots.", keywords: ["outlier", "IQR", "Z-score", "box plot", "detection"] },
    { q: "What is ETL?", a: "Extract, Transform, Load. Pull data → clean/format → load into warehouse. Foundation of data pipelines.", keywords: ["Extract", "Transform", "Load", "pipeline", "warehouse"] },
    { q: "What is A/B testing?", a: "Experiment comparing two versions. Split users randomly, measure metric. Statistical significance determines winner.", keywords: ["A/B", "experiment", "statistical significance", "metric", "random"] },
  ],
  "Python Developer": [
    { q: "What are Python decorators?", a: "Functions that modify other functions. Use @decorator syntax. Wraps function with wrapper function.", keywords: ["decorator", "@", "wrapper", "modify", "function"] },
    { q: "What is list vs tuple?", a: "List: mutable, uses []. Tuple: immutable, uses (), faster. Tuples can be dict keys.", keywords: ["mutable", "immutable", "list", "tuple", "dict keys"] },
    { q: "What is a Python generator?", a: "Function that yields values one at a time. Memory efficient. Uses yield keyword.", keywords: ["generator", "yield", "memory", "efficient", "lazy"] },
    { q: "What is OOP in Python?", a: "Class (blueprint), object (instance), encapsulation, inheritance, polymorphism, abstraction.", keywords: ["class", "object", "encapsulation", "inheritance", "polymorphism", "abstraction"] },
    { q: "What is the GIL in Python?", a: "Global Interpreter Lock — one thread at a time. Solution: multiprocessing for CPU-bound, asyncio for I/O.", keywords: ["GIL", "Global Interpreter Lock", "thread", "multiprocessing", "asyncio"] },
    { q: "What is list comprehension?", a: "[expression for item in iterable if condition]. Concise, faster than for loop.", keywords: ["comprehension", "expression", "iterable", "condition", "concise"] },
    { q: "What is *args and **kwargs?", a: "*args: variable positional arguments (tuple). **kwargs: variable keyword arguments (dict).", keywords: ["*args", "**kwargs", "positional", "keyword", "tuple", "dict"] },
    { q: "What is pip?", a: "Package Installer for Python. pip install, pip freeze, requirements.txt. Virtual environments isolate dependencies.", keywords: ["pip", "install", "requirements.txt", "virtual environment", "package"] },
    { q: "What is deep copy vs shallow copy?", a: "Shallow: copies object, references same nested. Deep: copies everything recursively. copy.deepcopy().", keywords: ["shallow", "deep", "copy", "nested", "recursive", "deepcopy"] },
    { q: "What is exception handling?", a: "try/except/else/finally. raise to throw. Custom exceptions: class MyError(Exception).", keywords: ["try", "except", "finally", "raise", "exception", "custom"] },
  ],
};

const GOALS = Object.keys(INTERVIEW_DATA);
const TIMER_SECONDS = 120;

const styles = `
  .flip-card { perspective: 1200px; min-height: 280px; cursor: pointer; margin-bottom: 20px; }
  .flip-card-inner { position: relative; width: 100%; min-height: 280px; transition: transform 0.55s cubic-bezier(0.45,0.05,0.55,0.95); transform-style: preserve-3d; }
  .flip-card-inner.flipped { transform: rotateY(180deg); }
  .flip-card-front, .flip-card-back {
    position: absolute; width: 100%; min-height: 280px;
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    border-radius: 20px; padding: 40px 32px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; box-sizing: border-box;
  }
  .flip-card-front { background: rgba(6,13,31,0.7); border: 1px solid rgba(79,139,255,0.2); backdrop-filter: blur(20px); }
  .flip-card-back { background: rgba(0,212,170,0.06); border: 1px solid rgba(0,212,170,0.25); backdrop-filter: blur(20px); transform: rotateY(180deg); }
  .mark-btn { margin-top: 16px; padding: 12px 28px; border-radius: 12px; border: none; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
  .mark-btn.unmarked { background: rgba(255,214,10,0.12); border: 1px solid rgba(255,214,10,0.3); color: #ffd60a; }
  .mark-btn.marked { background: rgba(0,212,170,0.12); border: 1px solid rgba(0,212,170,0.3); color: #00d4aa; }
  .tab-btn { padding: 10px 28px; border-radius: 999px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
  .tab-btn.active { background: linear-gradient(135deg,#4f8bff,#00d4aa); color: #fff; border: none; }
  .tab-btn.inactive { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.08); }
  .keyword-chip { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; margin: 4px; }
  .chip-hit { background: rgba(0,212,170,0.15); border: 1px solid rgba(0,212,170,0.35); color: #00d4aa; }
  @keyframes fadeSlideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  .fade-in { animation: fadeSlideIn 0.4s ease forwards; }
`;

function CircleTimer({ seconds, total }) {
  const r = 28, circ = 2 * Math.PI * r;
  const pct = seconds / total;
  const dash = circ * pct;
  const color = pct > 0.5 ? "#00d4aa" : pct > 0.25 ? "#ffd60a" : "#ff4d6d";
  const urgent = pct <= 0.25;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 36 36)" style={{ transition: "stroke-dasharray 1s linear, stroke 0.5s" }} />
        <text x="36" y="40" textAnchor="middle" fontSize="14" fontWeight="800"
          fill={urgent ? "#ff4d6d" : "rgba(255,255,255,0.85)"}>
          {`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`}
        </text>
      </svg>
      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "4px", letterSpacing: "1px" }}>
        {urgent ? "⚠ TIME RUNNING OUT" : "TIME REMAINING"}
      </div>
    </div>
  );
}

function MockInterview({ questions }) {
  const [phase, setPhase] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [scores, setScores] = useState([]);
  const [selfScore, setSelfScore] = useState(null);
  const timerRef = useRef(null);

  const currentQ = questions[qIndex];
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 5;
  const scoreMap = { great: 5, ok: 3, missed: 1 };

  // ✅ FIX: Added qIndex to dependency array — timer restarts correctly per question
  useEffect(() => {
    if (phase !== "question") return;
    setSelfScore(null);

    // ✅ FIX: Clear any existing timer before starting new one
    clearInterval(timerRef.current);
    setTimeLeft(TIMER_SECONDS);

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase("reveal"); return 0; }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  // ✅ FIX: both phase AND qIndex in deps — was missing qIndex before
  }, [phase, qIndex]);

  const startInterview = () => { setPhase("question"); };
  const handleReveal = () => { clearInterval(timerRef.current); setPhase("reveal"); };

  const handleNext = (score) => {
    const newScores = [...scores, score];
    setScores(newScores);
    if (qIndex + 1 >= questions.length) {
      setPhase("result");
    } else {
      setQIndex(qIndex + 1);
      setPhase("question"); // ✅ phase change triggers useEffect with new qIndex
    }
  };

  if (phase === "intro") return (
    <div className="fade-in" style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: "52px", marginBottom: "16px" }}>🎤</div>
      <div style={{ fontSize: "22px", fontWeight: 800, color: "rgba(255,255,255,0.9)", marginBottom: "12px" }}>Mock Interview</div>
      <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: "1.9", marginBottom: "32px" }}>
        {questions.length} questions • 2 mins each<br />
        Question பார்த்து மனசுல answer யோசி<br />
        Timer முடிஞ்சா answer reveal ஆகும் + score குடுக்கணும்
      </div>
      <button onClick={startInterview} style={{
        padding: "16px 48px", borderRadius: "14px", border: "none",
        background: "linear-gradient(135deg,#4f8bff,#00d4aa)",
        color: "white", fontSize: "16px", fontWeight: 800, cursor: "pointer"
      }}>Start Interview →</button>
    </div>
  );

  if (phase === "result") {
    const pct = Math.round((totalScore / maxScore) * 100);
    const grade = pct >= 80 ? { label: "Excellent", color: "#00d4aa", emoji: "🏆" }
                : pct >= 60 ? { label: "Good", color: "#ffd60a", emoji: "👍" }
                : pct >= 40 ? { label: "Average", color: "#ff9f43", emoji: "📖" }
                :             { label: "Needs Practice", color: "#ff4d6d", emoji: "💪" };
    return (
      <div className="fade-in" style={{ textAlign: "center", padding: "28px 16px" }}>
        <div style={{ fontSize: "52px" }}>{grade.emoji}</div>
        <div style={{ fontSize: "20px", fontWeight: 800, color: grade.color, marginTop: "12px" }}>{grade.label}</div>
        <div style={{ fontSize: "52px", fontWeight: 900, color: grade.color, margin: "12px 0" }}>
          {totalScore}<span style={{ fontSize: "24px", color: "rgba(255,255,255,0.3)" }}>/{maxScore}</span>
        </div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "28px" }}>{pct}% overall score</div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {scores.map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: "10px 4px", borderRadius: "10px", textAlign: "center",
              background: s === 5 ? "rgba(0,212,170,0.12)" : s === 3 ? "rgba(255,214,10,0.12)" : "rgba(255,77,109,0.12)",
              border: `1px solid ${s === 5 ? "rgba(0,212,170,0.3)" : s === 3 ? "rgba(255,214,10,0.3)" : "rgba(255,77,109,0.3)"}`,
            }}>
              <div style={{ fontSize: "16px", fontWeight: 800, color: s === 5 ? "#00d4aa" : s === 3 ? "#ffd60a" : "#ff4d6d" }}>{s}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>Q{i + 1}</div>
            </div>
          ))}
        </div>
        <button onClick={() => { setPhase("intro"); setQIndex(0); setScores([]); setTimeLeft(TIMER_SECONDS); }} style={{
          width: "100%", padding: "14px", borderRadius: "12px", border: "none",
          background: "linear-gradient(135deg,#4f8bff,#00d4aa)",
          color: "white", fontSize: "15px", fontWeight: 700, cursor: "pointer"
        }}>🔄 Retry Interview</button>
      </div>
    );
  }

  if (phase === "question") return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Question {qIndex + 1} of {questions.length}</div>
        <div style={{ display: "flex", gap: "6px" }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: "24px", height: "4px", borderRadius: "2px", transition: "all 0.3s",
              background: i < qIndex ? "#00d4aa" : i === qIndex ? "#4f8bff" : "rgba(255,255,255,0.08)"
            }} />
          ))}
        </div>
      </div>
      <CircleTimer seconds={timeLeft} total={TIMER_SECONDS} />
      <div style={{
        background: "rgba(6,13,31,0.8)", border: "1px solid rgba(79,139,255,0.2)",
        borderRadius: "20px", padding: "36px 32px", textAlign: "center", minHeight: "180px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        marginBottom: "16px"
      }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "rgba(79,139,255,0.7)", marginBottom: "20px" }}>❓ QUESTION</div>
        <div style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.9)", lineHeight: "1.7" }}>{currentQ.q}</div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", marginTop: "20px" }}>மனசுல answer யோசி... timer முடிஞ்சா reveal ஆகும்</div>
      </div>
      <button onClick={handleReveal} style={{
        width: "100%", padding: "14px", borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
        color: "rgba(255,255,255,0.5)", fontSize: "14px", fontWeight: 600, cursor: "pointer"
      }}>I'm Done — Show Answer</button>
    </div>
  );

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Question {qIndex + 1} of {questions.length}</div>
        <div style={{ display: "flex", gap: "6px" }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: "24px", height: "4px", borderRadius: "2px", transition: "all 0.3s",
              background: i < qIndex ? "#00d4aa" : i === qIndex ? "#4f8bff" : "rgba(255,255,255,0.08)"
            }} />
          ))}
        </div>
      </div>
      <div style={{
        background: "rgba(6,13,31,0.8)", border: "1px solid rgba(79,139,255,0.2)",
        borderRadius: "20px", padding: "28px 24px", marginBottom: "16px"
      }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "rgba(0,212,170,0.7)", marginBottom: "10px" }}>✅ MODEL ANSWER</div>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: "1.85" }}>{currentQ.a}</div>
      </div>
      <div style={{
        background: "rgba(6,13,31,0.6)", border: "1px solid rgba(255,214,10,0.15)",
        borderRadius: "16px", padding: "20px", marginBottom: "16px"
      }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "rgba(255,214,10,0.7)", marginBottom: "12px" }}>🔑 KEY POINTS TO COVER</div>
        <div>{currentQ.keywords.map((k, i) => <span key={i} className="keyword-chip chip-hit">{k}</span>)}</div>
      </div>
      {selfScore === null ? (
        <div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "12px", textAlign: "center" }}>
            உன் answer எப்படி இருந்துச்சு?
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { key: "great", label: "🎯 Nailed it", color: "#00d4aa", bg: "rgba(0,212,170,0.12)", border: "rgba(0,212,170,0.3)" },
              { key: "ok", label: "👍 Mostly got it", color: "#ffd60a", bg: "rgba(255,214,10,0.12)", border: "rgba(255,214,10,0.3)" },
              { key: "missed", label: "😅 Missed it", color: "#ff4d6d", bg: "rgba(255,77,109,0.12)", border: "rgba(255,77,109,0.3)" },
            ].map(opt => (
              <button key={opt.key} onClick={() => setSelfScore(opt.key)} style={{
                flex: 1, padding: "12px 8px", borderRadius: "12px",
                border: `1px solid ${opt.border}`, background: opt.bg, color: opt.color,
                fontSize: "13px", fontWeight: 700, cursor: "pointer"
              }}>{opt.label}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="fade-in">
          <div style={{
            textAlign: "center", padding: "16px", borderRadius: "14px", marginBottom: "16px",
            background: scoreMap[selfScore] === 5 ? "rgba(0,212,170,0.08)" : scoreMap[selfScore] === 3 ? "rgba(255,214,10,0.08)" : "rgba(255,77,109,0.08)",
            border: `1px solid ${scoreMap[selfScore] === 5 ? "rgba(0,212,170,0.2)" : scoreMap[selfScore] === 3 ? "rgba(255,214,10,0.2)" : "rgba(255,77,109,0.2)"}`,
          }}>
            <div style={{ fontSize: "36px", fontWeight: 900, color: scoreMap[selfScore] === 5 ? "#00d4aa" : scoreMap[selfScore] === 3 ? "#ffd60a" : "#ff4d6d" }}>
              {scoreMap[selfScore]}/5
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
              {scoreMap[selfScore] === 5 ? "Excellent! Keep it up 🔥" : scoreMap[selfScore] === 3 ? "Good effort! Review key points 📖" : "Practice more on this topic 💪"}
            </div>
          </div>
          <button onClick={() => handleNext(scoreMap[selfScore])} style={{
            width: "100%", padding: "14px", borderRadius: "12px", border: "none",
            background: qIndex + 1 >= questions.length ? "linear-gradient(135deg,#ffd60a,#ff6b35)" : "linear-gradient(135deg,#4f8bff,#00d4aa)",
            color: "white", fontSize: "15px", fontWeight: 700, cursor: "pointer"
          }}>
            {qIndex + 1 >= questions.length ? "🏆 See Final Score" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}

function FlashCards({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState([]);
  const currentQ = questions[currentIndex];
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);
  const isReviewed = reviewed.includes(currentIndex);

  const handleNext = () => { setFlipped(false); setTimeout(() => setCurrentIndex(p => (p + 1) % questions.length), 300); };
  const handlePrev = () => { setFlipped(false); setTimeout(() => setCurrentIndex(p => (p - 1 + questions.length) % questions.length), 300); };
  const handleMark = (e) => {
    e.stopPropagation();
    setReviewed(isReviewed ? reviewed.filter(i => i !== currentIndex) : [...reviewed, currentIndex]);
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{reviewed.length} reviewed ✓</span>
        </div>
        <div style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "999px", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#4f8bff,#00d4aa)", borderRadius: "999px", transition: "width 0.4s ease" }} />
        </div>
      </div>
      <div className="flip-card" onClick={() => setFlipped(!flipped)}>
        <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
          <div className="flip-card-front">
            <div style={{ position: "absolute", top: "16px", left: "20px", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(79,139,255,0.7)" }}>❓ Question</div>
            <div style={{ position: "absolute", top: "16px", right: "20px", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>Tap to reveal</div>
            <div style={{ fontSize: "18px", fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: "1.75", maxWidth: "600px" }}>{currentQ.q}</div>
          </div>
          <div className="flip-card-back">
            <div style={{ position: "absolute", top: "16px", left: "20px", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(0,212,170,0.7)" }}>✅ Answer</div>
            <div style={{ position: "absolute", top: "16px", right: "20px", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>Tap to hide</div>
            <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: "1.75", maxWidth: "600px" }}>{currentQ.a}</div>
            <button className={`mark-btn ${isReviewed ? "marked" : "unmarked"}`} onClick={handleMark}>
              {isReviewed ? "✅ Reviewed" : "☑ Mark as Reviewed"}
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button onClick={handlePrev} style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>← Prev</button>
        <button onClick={(e) => { e.stopPropagation(); setFlipped(!flipped); }} style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid rgba(79,139,255,0.3)", background: "rgba(79,139,255,0.1)", color: "#7eb8ff", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>
          {flipped ? "Hide Answer" : "Show Answer"}
        </button>
        <button onClick={handleNext} style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#4f8bff,#00d4aa)", color: "white", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>Next →</button>
      </div>
      <div className="card">
        <h3>All Questions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
          {questions.map((item, i) => (
            <div key={i} onClick={() => { setCurrentIndex(i); setFlipped(false); }} style={{
              padding: "12px 16px", borderRadius: "10px", cursor: "pointer", fontSize: "14px", transition: "all 0.2s",
              border: i === currentIndex ? "1px solid rgba(79,139,255,0.4)" : "1px solid rgba(255,255,255,0.05)",
              background: i === currentIndex ? "rgba(79,139,255,0.08)" : "rgba(255,255,255,0.02)",
              color: reviewed.includes(i) ? "rgba(0,212,170,0.8)" : "rgba(255,255,255,0.6)",
              display: "flex", alignItems: "center", gap: "10px"
            }}>
              <span style={{ fontSize: "12px", minWidth: "20px" }}>{reviewed.includes(i) ? "✅" : `${i + 1}.`}</span>
              {item.q}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "16px", padding: "16px", background: "rgba(79,139,255,0.04)", border: "1px solid rgba(79,139,255,0.12)", borderRadius: "12px", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
        {[{ val: questions.length, label: "Total", color: "#7eb8ff" }, { val: reviewed.length, label: "Reviewed", color: "#00d4aa" }, { val: questions.length - reviewed.length, label: "Remaining", color: "#ffd60a" }].map(s => (
          <div key={s.label}>
            <div style={{ fontSize: "24px", fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function InterviewQA() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState("Full Stack Developer");
  const [activeTab, setActiveTab] = useState("flashcards");
  const questions = INTERVIEW_DATA[selectedGoal];

  return (
    <div className="app-wrapper">
      <style>{styles}</style>
      <div className="top-bar">
        <h2>🎤 Interview Q&A</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>← Back</button>
      </div>
      <div style={{ marginBottom: "20px", overflowX: "auto", paddingBottom: "8px" }}>
        <div style={{ display: "flex", gap: "8px", minWidth: "max-content" }}>
          {GOALS.map(goal => (
            <button key={goal} onClick={() => { setSelectedGoal(goal); setActiveTab("flashcards"); }} style={{
              padding: "8px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
              border: selectedGoal === goal ? "1px solid rgba(79,139,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
              background: selectedGoal === goal ? "rgba(79,139,255,0.15)" : "rgba(255,255,255,0.03)",
              color: selectedGoal === goal ? "#7eb8ff" : "rgba(255,255,255,0.4)",
            }}>{goal}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        <button className={`tab-btn ${activeTab === "flashcards" ? "active" : "inactive"}`} onClick={() => setActiveTab("flashcards")}>🃏 Flash Cards</button>
        <button className={`tab-btn ${activeTab === "mock" ? "active" : "inactive"}`} onClick={() => setActiveTab("mock")}>🎤 Mock Interview</button>
      </div>
      {activeTab === "flashcards"
        ? <FlashCards key={selectedGoal} questions={questions} />
        : <MockInterview key={selectedGoal + "-mock"} questions={questions} />
      }
    </div>
  );
}