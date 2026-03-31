/* eslint-disable */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { generateCourseRoadmap } from "../services/aiService";

function CoursePage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const courseName = decodeURIComponent(name);

  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { navigate("/"); return; }

      // Generate roadmap for this course
      const generated = await generateCourseRoadmap(courseName);
      setRoadmap(generated);
      setLoading(false);
    });
    return () => unsub();
  }, [navigate, courseName]);

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="app-wrapper">
      {/* Top Bar */}
      <div className="top-bar">
        <h2>🎓 {courseName}</h2>
        <button className="back-btn" onClick={() => navigate("/courses")}>← Courses</button>
      </div>

      {/* Course Info */}
      <div className="card" style={{ marginBottom: "20px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🗺️</div>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "20px", fontWeight: 700,
          color: "rgba(255,255,255,0.9)",
          marginBottom: "8px",
          textTransform: "none",
          letterSpacing: "-0.3px"
        }}>
          {courseName} — Learning Roadmap
        </h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
          {roadmap.length} steps to master {courseName}. Follow this path to build strong skills!
        </p>
      </div>

      {/* Roadmap Steps — Clean, no buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingBottom: "100px" }}>
        {roadmap.map((step, index) => (
          <div
            key={index}
            style={{
              background: "rgba(6,13,31,0.7)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "18px 22px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              transition: "all 0.2s ease",
            }}
          >
            {/* Step Number */}
            <div style={{
              width: "40px", height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(79,139,255,0.2), rgba(0,212,170,0.2))",
              border: "1px solid rgba(79,139,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", fontWeight: 800,
              color: "#7eb8ff",
              flexShrink: 0,
              fontFamily: "var(--font-display)",
            }}>
              {index + 1}
            </div>

            {/* Step Title */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: "15px", fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
                marginBottom: "2px",
              }}>
                {step.title}
              </div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
                Step {index + 1} of {roadmap.length}
              </div>
            </div>

            {/* Arrow */}
            <div style={{ color: "rgba(255,255,255,0.15)", fontSize: "16px" }}>→</div>
          </div>
        ))}

        {/* Start Learning Button — at the bottom */}
        {roadmap.length > 0 && (
          <div style={{ marginTop: "12px" }}>
            <button
              className="primary-btn"
              onClick={() => navigate("/roadmap")}
            >
              🚀 Start Learning — Go to My Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePage;