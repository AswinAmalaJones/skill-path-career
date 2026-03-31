function Architecture() {
  return (
    <div className="app-wrapper">
      <div className="top-bar">
        <h2>🏗️ System Architecture</h2>
      </div>

      <div style={{ padding: "0 0 80px 0" }}>

        {/* Frontend Layer */}
        <div className="card" style={{ marginBottom: "16px" }}>
          <h3 style={{ color: "#a78bfa", marginBottom: "12px" }}>
            🖥️ Frontend Layer
          </h3>
          {[
            "React.js PWA",
            "Login / Register / Profile",
            "Dashboard + CRI Score",
            "Roadmap — Duolingo Style",
            "Task Submission & Rule-Based Feedback"
          ].map((item, i) => (
            <div key={i} style={{
              padding: "8px 12px",
              background: "rgba(108,99,255,0.08)",
              borderRadius: "8px",
              marginBottom: "8px",
              fontSize: "14px",
              color: "#cbd5e1",
              borderLeft: "3px solid #6C63FF"
            }}>
              {item}
            </div>
          ))}
        </div>

        {/* Intelligence Layer */}
        <div className="card" style={{ marginBottom: "16px" }}>
          <h3 style={{ color: "#34d399", marginBottom: "12px" }}>
            🧠 Intelligence Layer
          </h3>
          {[
            "CRI Engine — Career Readiness Index",
            "Rule-Based Task Generator (25+ Career Paths)",
            "Keyword-Based Answer Evaluation Engine",
            "Adaptive Difficulty Engine (Beginner / Intermediate / Advanced)",
            "Explainability Module — Why CRI Changed",
            "25+ Career Roadmap Generator",
            "Smart Fallback Chatbot — Zero API",
            "Resume ATS Scorer — Rule-Based"
          ].map((item, i) => (
            <div key={i} style={{
              padding: "8px 12px",
              background: "rgba(52,211,153,0.08)",
              borderRadius: "8px",
              marginBottom: "8px",
              fontSize: "14px",
              color: "#cbd5e1",
              borderLeft: "3px solid #34d399"
            }}>
              {item}
            </div>
          ))}
        </div>

        {/* Backend Layer */}
        <div className="card" style={{ marginBottom: "16px" }}>
          <h3 style={{ color: "#f59e0b", marginBottom: "12px" }}>
            🔥 Backend Layer (Firebase BaaS)
          </h3>
          {[
            "Firebase Authentication",
            "Firestore — NoSQL Database",
            "User Profiles & Progress",
            "Task History & Submissions",
            "Notes & Certificates",
            "SMTP Email Verification"
          ].map((item, i) => (
            <div key={i} style={{
              padding: "8px 12px",
              background: "rgba(245,158,11,0.08)",
              borderRadius: "8px",
              marginBottom: "8px",
              fontSize: "14px",
              color: "#cbd5e1",
              borderLeft: "3px solid #f59e0b"
            }}>
              {item}
            </div>
          ))}
        </div>

        {/* External APIs */}
        <div className="card" style={{ marginBottom: "16px" }}>
          <h3 style={{ color: "#60a5fa", marginBottom: "12px" }}>
            🌐 External Integrations
          </h3>
          {[
            "Rule-Based Task Engine — Hardcoded Intelligence",
            "Monaco Editor — In-Browser Code Editor",
            "YouTube Embed — Video Learning",
          ].map((item, i) => (
            <div key={i} style={{
              padding: "8px 12px",
              background: "rgba(96,165,250,0.08)",
              borderRadius: "8px",
              marginBottom: "8px",
              fontSize: "14px",
              color: "#cbd5e1",
              borderLeft: "3px solid #60a5fa"
            }}>
              {item}
            </div>
          ))}
        </div>

        {/* Future Enhancements */}
        <div className="card">
          <h3 style={{ color: "#f472b6", marginBottom: "12px" }}>
            🚀 Future Enhancements
          </h3>
          {[
            "LLM-based Deep Skill Validation",
            "Server-side AI (Firebase Cloud Functions)",
            "Push Notifications",
            "Peer Learning & Leaderboard",
            "Multi-language Support (Tamil, Hindi, Malayalam)",
            "Company Job Matching",
            "LinkedIn Integration",
            "Weekly Assessment Tests"
          ].map((item, i) => (
            <div key={i} style={{
              padding: "8px 12px",
              background: "rgba(244,114,182,0.08)",
              borderRadius: "8px",
              marginBottom: "8px",
              fontSize: "14px",
              color: "#94a3b8",
              borderLeft: "3px solid #f472b6",
              opacity: 0.8
            }}>
              🔮 {item}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Architecture;