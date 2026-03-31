/* eslint-disable */
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { generateRoadmap } from "../services/aiService";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

function Roadmap() {
  const [cri, setCri] = useState(0);
  const [loading, setLoading] = useState(true);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [roadmapData, setRoadmapData] = useState([]);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  const generateAndSave = async (userId, goal) => {
    setGenerating(true);
    try {
      const generated = await generateRoadmap(goal);
      if (generated && generated.length > 0) {
        await updateDoc(doc(db, "users", userId), { roadmap: generated });
        setRoadmapData(generated);
      }
    } catch (err) {
      console.error("Generate failed:", err);
    }
    setGenerating(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { navigate("/"); return; }

      if (analytics) {
        logEvent(analytics, "roadmap_viewed");
      }
      
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setCri(data.cri || 0);
        setWatchedVideos(data.watchedVideos || []);
        if (data.roadmap && data.roadmap.length > 0) {
          setRoadmapData(data.roadmap);
          setLoading(false);
        } else {
          setLoading(false);
          await generateAndSave(user.uid, data.goal || "Full Stack Developer");
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  if (loading) return <div className="loading-screen">Loading...</div>;

  if (generating) return (
    <div className="loading-screen">
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>🗺️</div>
        <div style={{ fontSize: "18px", fontWeight: "700", color: "#a78bfa" }}>
          Setting up your personalized roadmap...
        </div>
        <div style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
          This will only take a moment
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-wrapper">
      <div className="top-bar">
        <h2>Your Learning Journey 🚀</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>← Back</button>
      </div>

      {roadmapData.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🗺️</div>
          <p style={{ color: "#64748b", marginBottom: "16px" }}>
            No roadmap yet! Click below to generate your path.
          </p>
          <button className="primary-btn" onClick={async () => {
            const user = auth.currentUser;
            if (!user) return;
            const snap = await getDoc(doc(db, "users", user.uid));
            const goal = snap.data()?.goal || "Full Stack Developer";
            await generateAndSave(user.uid, goal);
          }}>
            🗺️ Generate My Roadmap
          </button>
        </div>
      ) : (
        <div className="duolingo-path">
          {roadmapData.map((step, index) => {
            const unlocked = cri >= index * 10;
            const videoWatched = watchedVideos.includes(`roadmap_${index}`);
            return (
              <div
                key={index}
                className={`path-row ${index % 2 === 0 ? "left" : "right"}`}
                onClick={() => unlocked && navigate(`/learn/${index}`)}
                style={{ cursor: unlocked ? "pointer" : "default" }}
              >
                <div className={`path-circle ${unlocked ? "active" : "locked"}`}>
                  {videoWatched ? "✅" : unlocked ? (index + 1) : "🔒"}
                </div>
                <div className="path-label">
                  {step.title}
                  {videoWatched &&
                    <span style={{ color: "#4ade80", marginLeft: "8px" }}>✅</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "24px", paddingBottom: "80px" }}>
        <button
          className="primary-btn"
          style={{ fontSize: "13px", padding: "10px 20px", background: "rgba(255,255,255,0.06)" }}
          onClick={async () => {
            const user = auth.currentUser;
            if (!user) return;
            const snap = await getDoc(doc(db, "users", user.uid));
            const goal = snap.data()?.goal || "Full Stack Developer";
            await updateDoc(doc(db, "users", user.uid), { roadmap: [] });
            await generateAndSave(user.uid, goal);
          }}>
          🔄 Regenerate Roadmap
        </button>
      </div>
    </div>
  );
}

export default Roadmap;