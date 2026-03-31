import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// ✅ FIX: Threshold changed from 50 to 30 — consistent with ChatBot.js & project docs
const CERTIFICATE_CRI_THRESHOLD = 30;

function Certificate() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const certRef = useRef(null);
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

  const handleDownload = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #cert-print, #cert-print * { visibility: visible; }
        #cert-print {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: white !important;
          padding: 40px;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  // ✅ FIX: Use constant — easy to update in one place
  const eligible = (userData?.cri || 0) >= CERTIFICATE_CRI_THRESHOLD;

  const today = new Date().toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric"
  });

  const certId = `SPAI-${Date.now().toString().slice(-6)}`;

  const studentName =
    userData?.displayName ||
    userData?.name ||
    userData?.email?.split("@")[0]?.replace(/[^a-zA-Z]/g, " ")?.trim() ||
    "Student";

  return (
    <div className="app-wrapper">
      <div className="top-bar">
        <h2>🏆 Certificate</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>← Back</button>
      </div>

      {!eligible ? (
        <div className="cert-locked">
          <div className="cert-lock-icon">🔒</div>
          <h3>Certificate Locked</h3>
          {/* ✅ FIX: Shows correct threshold */}
          <p>Reach <strong>CRI Score {CERTIFICATE_CRI_THRESHOLD}+</strong> to unlock your certificate!</p>
          <div className="cert-progress-wrap">
            <div className="cert-progress-bar">
              <div
                className="cert-progress-fill"
                style={{ width: `${Math.min(((userData?.cri || 0) / CERTIFICATE_CRI_THRESHOLD) * 100, 100)}%` }}
              />
            </div>
            <span style={{ color: "#a78bfa", fontSize: "13px", marginTop: "8px" }}>
              {userData?.cri || 0} / {CERTIFICATE_CRI_THRESHOLD} CRI
            </span>
          </div>
          <button className="primary-btn" onClick={() => navigate("/roadmap")}>
            Continue Learning 🚀
          </button>
        </div>
      ) : (
        <>
          <div id="cert-print" ref={certRef} className="cert-card">
            <div className="cert-top-border" />
            <div className="cert-logo">🎓</div>
            <p className="cert-org">SkillPath AI</p>
            <p className="cert-label">CERTIFICATE OF COMPLETION</p>
            <p className="cert-presents">This is to certify that</p>
            <h2 className="cert-name">{studentName}</h2>
            <p className="cert-body">
              has successfully completed the
              <strong> {userData?.goal || "Career"} Learning Path </strong>
              on SkillPath AI with a Career Readiness Index of
              <strong> {userData?.cri || 0}%</strong>
            </p>

            {/* Stats row */}
            <div style={{
              display: "flex", justifyContent: "center",
              gap: "24px", margin: "16px 0", flexWrap: "wrap"
            }}>
              {[
                { val: `${userData?.cri || 0}%`, label: "CRI Score", color: "#6C63FF" },
                { val: userData?.streak || 0, label: "Day Streak", color: "#10b981" },
                { val: (userData?.watchedVideos || []).length, label: "Videos", color: "#f59e0b" },
                { val: (userData?.completedQuizzes || []).length, label: "Quizzes", color: "#ec4899" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: "700", color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="cert-divider" />

            <div className="cert-footer">
              <div className="cert-footer-item">
                <strong>{today}</strong>
                <span>Date of Issue</span>
              </div>
              <div className="cert-seal">✦</div>
              <div className="cert-footer-item">
                <strong>{certId}</strong>
                <span>Certificate ID</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px", paddingBottom: "80px" }}>
            <button
              className="primary-btn"
              style={{ maxWidth: "320px", margin: "0 auto" }}
              onClick={handleDownload}
            >
              ⬇️ Download Certificate (PDF)
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Certificate;