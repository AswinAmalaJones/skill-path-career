/* eslint-disable */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function SkillGap() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { navigate("/"); return; }
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setUserData(snap.data());
      setLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  if (loading) return <div className="loading-screen">Loading...</div>;

  const completedQuizzes = userData?.completedQuizzes || [];
  const watchedVideos = userData?.watchedVideos || [];
  const cri = userData?.cri || 0;
  const roadmap = userData?.roadmap || [];

  // Dynamic skills — roadmap based!
  const skillScores = roadmap.map((step, index) => {
    let score = 0;
    if (completedQuizzes.includes(index)) score += 60;
    if (watchedVideos.includes(`roadmap_${index}`)) score += 20;
    if (cri >= (index + 1) * 10) score += 20;
    return {
      name: step.title,
      topic: index,
      icon: getIcon(step.title),
      score
    };
  });

  function getIcon(title) {
    const t = (title || "").toLowerCase();
    if (t.includes("html")) return "🌐";
    if (t.includes("css")) return "🎨";
    if (t.includes("javascript") || t.includes("js")) return "⚡";
    if (t.includes("react")) return "⚛️";
    if (t.includes("node")) return "🖥️";
    if (t.includes("firebase")) return "🔥";
    if (t.includes("api")) return "🔗";
    if (t.includes("git")) return "📦";
    if (t.includes("python")) return "🐍";
    if (t.includes("sql") || t.includes("database")) return "🗄️";
    if (t.includes("machine") || t.includes("ml")) return "🤖";
    if (t.includes("data")) return "📊";
    if (t.includes("pandas")) return "🐼";
    if (t.includes("power bi") || t.includes("tableau")) return "📈";
    if (t.includes("docker")) return "🐳";
    if (t.includes("aws") || t.includes("cloud")) return "☁️";
    if (t.includes("security") || t.includes("cyber")) return "🔒";
    if (t.includes("flutter") || t.includes("dart")) return "📱";
    if (t.includes("kotlin") || t.includes("android")) return "🤖";
    if (t.includes("swift") || t.includes("ios")) return "🍎";
    if (t.includes("java")) return "☕";
    if (t.includes("figma") || t.includes("design")) return "🎨";
    if (t.includes("project")) return "💼";
    if (t.includes("job") || t.includes("interview")) return "🎯";
    return "📚";
  }

  const strong = skillScores.filter(s => s.score >= 60);
  const weak = skillScores.filter(s => s.score < 60);

  return (
    <div className="app-wrapper">
      <div className="top-bar">
        <h2>📊 Skill Gap Analysis</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>← Back</button>
      </div>

      <div className="gap-summary">
        <div className="gap-summary-card strong">
          <div className="gap-num">{strong.length}</div>
          <div className="gap-label">Strong Skills 💪</div>
        </div>
        <div className="gap-summary-card weak">
          <div className="gap-num">{weak.length}</div>
          <div className="gap-label">Need Work 📚</div>
        </div>
        <div className="gap-summary-card cri">
          <div className="gap-num">{cri}%</div>
          <div className="gap-label">Overall CRI 🎯</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "16px" }}>
        <h3>Skill Progress</h3>
        {skillScores.length === 0 ? (
          <p style={{ color: "#64748b", fontSize: "13px" }}>
            Complete your roadmap to see skill analysis!
          </p>
        ) : (
          <div className="skill-bars">
            {skillScores.map((skill) => (
              <div key={skill.name} className="skill-bar-row">
                <div className="skill-bar-label">
                  <span>{skill.icon} {skill.name}</span>
                  <span className={`skill-bar-pct ${skill.score >= 60 ? "strong-text" : "weak-text"}`}>
                    {skill.score}%
                  </span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className={`skill-bar-fill ${skill.score >= 60 ? "fill-strong" : "fill-weak"}`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {strong.length > 0 && (
        <div className="card" style={{ marginBottom: "16px" }}>
          <h3>Strong Skills ✅</h3>
          <div className="skill-chips">
            {strong.map(s => (
              <div key={s.name} className="skill-chip strong-chip">
                {s.icon} {s.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {weak.length > 0 && (
        <div className="card" style={{ paddingBottom: "16px" }}>
          <h3>Focus Next 🎯</h3>
          <div className="weak-list">
            {weak.slice(0, 3).map(s => (
              <div key={s.name} className="weak-item">
                <div className="weak-item-left">
                  <span className="weak-icon">{s.icon}</span>
                  <div>
                    <div className="weak-name">{s.name}</div>
                    <div className="weak-action">Watch video + Take quiz to improve</div>
                  </div>
                </div>
                <button className="go-btn" onClick={() => navigate(`/learn/${s.topic}`)}>
                  Start →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ paddingBottom: "80px" }} />

      <div className="bottom-nav">
        <button onClick={() => navigate("/dashboard")}>🏠</button>
        <button onClick={() => navigate("/roadmap")}>🗺️</button>
        <button onClick={() => navigate("/notes")}>📝</button>
        <button onClick={() => navigate("/certificate")}>🏆</button>
      </div>
    </div>
  );
}

export default SkillGap;