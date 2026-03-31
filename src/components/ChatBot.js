import { useState, useRef, useEffect } from "react";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! 👋 I'm your SkillPath AI Tutor. Ask me anything about coding, career, or your learning journey!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    setTimeout(() => {
      const reply = generateSmartReply(userMsg);
      setMessages((m) => [...m, { role: "bot", text: reply }]);
      setLoading(false);
    }, 600);
  };

  const generateSmartReply = (question) => {
    const q = question.toLowerCase();

    if (q.match(/^(hi|hello|hey|hii|helo|vanakkam|hai)[\s!]*$/))
      return "Hello! 👋 I'm SkillPath AI. Ask me about HTML, CSS, JavaScript, React, Python, career tips, CRI score, or anything tech!";
    if (q.includes("how are you") || q.includes("how r u"))
      return "I'm running at full speed! 🚀 Ready to help you become job-ready. What do you want to learn today?";
    if (q.includes("who are you") || q.includes("what are you"))
      return "I'm SkillPath AI Tutor 🤖 — built to help Indian college students become job-ready through daily learning, tasks, and skill tracking!";
    if (q.includes("cri") || q.includes("career readiness"))
      return "📊 CRI (Career Readiness Index) is your job-readiness score from 0–100%.\n\n✅ Complete daily tasks → +5 CRI\n✅ Watch videos → +2 CRI\n✅ Take quizzes → +1 to +5 CRI\n❌ Miss a day → streak resets\n\nAim for 70%+ to be job-ready!";
    if (q.includes("increase cri") || q.includes("improve cri") || q.includes("boost cri"))
      return "To increase your CRI:\n1️⃣ Complete daily missions every day\n2️⃣ Watch roadmap videos\n3️⃣ Take quizzes after each topic\n4️⃣ Maintain your streak 🔥\n\nConsistency is the key!";
    if (q.includes("streak"))
      return "🔥 Streak = consecutive days you completed your daily task!\n\nHigher streak = higher CRI boost.\nDon't miss a day — even 5 minutes counts!";
    if (q.includes("certificate") || q.includes("cert"))
      return "🏆 Certificate unlock condition: CRI must be 30% or above!\n\nComplete daily tasks + quizzes to reach 30+ CRI and download your SkillPath AI certificate.";
    if (q.includes("roadmap"))
      return "🗺️ Your roadmap is personalized based on your career goal!\n\nGo to Roadmap page → watch videos → take quiz for each step → your skill score improves automatically.";
    if (q.includes("skill gap") || q.includes("skill analysis") || q.includes("weak skill"))
      return "📊 Skill Gap Analysis shows:\n✅ Strong skills (score ≥ 60%)\n📚 Skills that need work (score < 60%)\n\nWatch video + take quiz for weak skills to improve your score!";
    if (q.includes("daily task") || q.includes("daily mission") || q.includes("mission"))
      return "📋 Daily Mission is a question based on your career goal and current CRI level.\n\nAnswer it every day → get feedback → CRI increases!\nSkip it → streak resets.";
    if (q.includes("resume") || q.includes("cv"))
      return "📄 Resume tips for freshers:\n1️⃣ Keep it 1 page\n2️⃣ Add GitHub + LinkedIn links\n3️⃣ List 2-3 projects with tech stack\n4️⃣ Use action words: Built, Developed, Designed\n5️⃣ Include skills section with tools you know";
    if (q.includes("html"))
      return "🌐 HTML structures web pages.\n\nStart with: <html>, <head>, <body>, <h1>, <p>, <div>, <a>, <img>\n\n👉 Project idea: Build a personal portfolio page using only HTML!";
    if (q.includes("css") || q.includes("flexbox") || q.includes("grid"))
      return "🎨 CSS styles your HTML pages.\n\nLearn in order:\n1. Selectors & properties\n2. Box model\n3. Flexbox (most important!)\n4. Grid\n5. Responsive design";
    if (q.includes("javascript") || q.includes("js ") || q === "js")
      return "⚡ JavaScript makes websites interactive!\n\nLearn: Variables → Functions → Arrays → DOM → Fetch API\n\n👉 Project: Build a to-do list app!";
    if (q.includes("let") || q.includes("const") || q.includes("var"))
      return "⚡ var vs let vs const:\n\n• var — old, function-scoped, avoid\n• let — block-scoped, can reassign\n• const — block-scoped, cannot reassign\n\n✅ Always use const by default!";
    if (q.includes("react"))
      return "⚛️ React is a JavaScript library for building UIs.\n\nKey concepts:\n1. Components\n2. Props\n3. State (useState)\n4. useEffect\n\n👉 Project: Build a weather app!";
    if (q.includes("usestate") || q.includes("use state"))
      return "⚛️ useState manages component state.\n\nconst [count, setCount] = useState(0);\n\n• count = current value\n• setCount = function to update\n• 0 = initial value";
    if (q.includes("useeffect") || q.includes("use effect"))
      return "⚛️ useEffect runs side effects in React.\n\nCommon uses:\n• Fetch data on load\n• Set up event listeners\n\nAlways add [] dependency array to avoid infinite loops!";
    if (q.includes("node") || q.includes("nodejs"))
      return "🖥️ Node.js lets you run JavaScript on the server.\n\nLearn: npm → Express.js → REST APIs → MongoDB\n\n👉 Project: Build a simple REST API!";
    if (q.includes("python"))
      return "🐍 Python is great for data science, ML, and backend!\n\nLearn: Variables → Loops → Functions → OOP → Pandas\n\n👉 Project: Build a data analysis project with CSV!";
    if (q.includes("pandas") || q.includes("numpy"))
      return "🐼 Pandas & NumPy are Python data libraries.\n\nPandas: work with tables (DataFrames)\nNumPy: work with numbers & arrays\n\n✅ Start with: pd.read_csv() to load data!";
    if (q.includes("machine learning") || q.includes("ml") || q.includes("ai model"))
      return "🤖 Machine Learning = teaching computers to learn from data!\n\nTypes: Supervised / Unsupervised / Reinforcement\n\nStart with: Python + Pandas + Scikit-learn\n👉 First project: Predict house prices!";
    if (q.includes("git") || q.includes("github"))
      return "📦 Git = version control. GitHub = cloud storage for code.\n\ngit init → git add . → git commit -m 'msg' → git push\n\n✅ Always push your projects — recruiters check GitHub!";
    if (q.includes("sql") || q.includes("database") || q.includes("mysql") || q.includes("mongodb"))
      return "🗄️ Databases store your app's data.\n\nSQL: MySQL, PostgreSQL (structured)\nNoSQL: MongoDB, Firebase (flexible)\n\n✅ Learn SQL basics first — most companies use it!";
    if (q.includes("firebase"))
      return "🔥 Firebase is Google's backend platform.\n\nFeatures: Auth, Firestore DB, Storage, Hosting\n\n✅ Free tier is enough for college projects!";
    if (q.includes("dsa") || q.includes("data structure") || q.includes("algorithm") || q.includes("leetcode"))
      return "📚 DSA = Data Structures & Algorithms — important for interviews!\n\nLearn: Arrays → LinkedList → Stack → Trees → Sorting\n\n👉 Practice on LeetCode — start with Easy problems!";
    if (q.includes("interview") || q.includes("placement") || q.includes("job ready"))
      return "🎯 To crack tech interviews:\n\n1️⃣ DSA — practice 50+ problems\n2️⃣ Build 2-3 good projects\n3️⃣ Know your tech stack deeply\n4️⃣ Revise OOP, DBMS, OS basics\n5️⃣ Communicate your projects clearly\n\nCRI 70%+ = you're job ready! 💪";
    if (q.includes("project") || q.includes("idea"))
      return "💡 Project ideas for freshers:\n\n🌐 Frontend: Portfolio, Weather App, Quiz App\n⚡ Full Stack: Todo App, Blog, E-commerce\n🐍 Python: Expense Tracker, Scraper\n🤖 ML: Movie Recommender, Spam Detector\n\n✅ Pick ONE, build it fully, push to GitHub!";
    if (q.includes("deploy") || q.includes("hosting") || q.includes("vercel") || q.includes("netlify"))
      return "🚀 Deploy your React app FREE:\n\n• Vercel — best for React\n• Netlify — drag & drop deploy\n• Firebase Hosting — great with Firebase\n\nnpm run build → upload → done!";
    if (q.includes("docker") || q.includes("devops") || q.includes("kubernetes"))
      return "🐳 Docker packages your app into containers!\n\ndocker build -t myapp .\ndocker run -p 3000:3000 myapp\n\n✅ Learn Docker + CI/CD for DevOps roles!";
    if (q.includes("motivat") || q.includes("tired") || q.includes("give up") || q.includes("difficult"))
      return "💪 It's hard — but you're already doing better than most!\n\nEvery expert was once a beginner.\nConsistency beats talent.\n\n✅ Just do 30 minutes today. That's enough! 🚀";
    if (q.includes("salary") || q.includes("package") || q.includes("lpa"))
      return "💰 Fresher packages in India:\n\nService companies: 3-5 LPA\nProduct companies: 8-20 LPA\n\nSkills > College name. Build projects, contribute to GitHub! 🔥";
    if (q.includes("thank") || q.includes("thanks") || q.includes("nandri"))
      return "You're welcome! 😊 Keep learning and building — you've got this! 💪🔥";

    return "Great question! 🤔\n\nFocus on:\n1️⃣ Understanding the basics first\n2️⃣ Build a small project using it\n3️⃣ Push to GitHub\n\nConsistency daily > cramming once a week. You've got this! 💪🚀";
  };

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen((o) => !o)}>
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <span>🤖 SkillPath Tutor</span>
            <button onClick={() => setOpen(false)} className="chat-close">✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.text.split("\n").map((line, j) => (
                  <span key={j}>{line}{j < m.text.split("\n").length - 1 && <br />}</span>
                ))}
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot">
                <span className="typing">●●●</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <input
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot; 