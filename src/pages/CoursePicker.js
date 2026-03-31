/* eslint-disable */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { generateCourseRoadmap } from "../services/aiService";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

const POPULAR = [
  "Python", "Data Science", "Machine Learning",
  "UI/UX Design", "Cybersecurity", "DevOps",
  "Flutter", "React Native", "Cloud Computing",
  "Blockchain", "Full Stack", "Java",
  "Deep Learning", "Django", "Android",
  "iOS Developer", "Data Analyst", "NLP"
];

function CoursePicker() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEnroll = async (courseName) => {
    const name = (courseName || input).trim();

    if (!name) {
      setError("Course name type pannu!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));
      const existing = snap.data()?.courses || [];

      // Already enrolled check
      const found = existing.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );

      if (found) {
        navigate(`/course/${encodeURIComponent(name)}`);
        return;
      }

      // Hardcoded roadmap — no API!
      let roadmap = await generateCourseRoadmap(name);

      // Fallback safety
      if (!roadmap || roadmap.length === 0) {
        roadmap = Array.from({ length: 10 }, (_, i) => ({
          step: i + 1,
          title: `${name} - Step ${i + 1}`,
          searchQuery: `${name} tutorial step ${i + 1}`,
        }));
      }

      const newCourse = {
        name,
        roadmap,
        cri: 0,
        watchedVideos: [],
        completedQuizzes: [],
        enrolledAt: new Date().toLocaleDateString("en-IN"),
      };

      // Save to Firebase
      await updateDoc(doc(db, "users", user.uid), {
        courses: [...existing, newCourse],
      });

      if (analytics) {
        logEvent(analytics, "course_selected", {
          course_name: name
        });
      }

      navigate(`/course/${encodeURIComponent(name)}`);
    } catch (e) {
      console.log(e);
      setError("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="top-bar">
        <h2>🎓 Pick a Course</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
      </div>

      <div className="course-picker-wrap">

        {/* INPUT CARD */}
        <div className="card" style={{ marginBottom: "20px" }}>
          <h3>Type any course you want to learn</h3>

          <div className="course-input-row">
            <input
              className="note-input"
              placeholder="e.g. Python, Machine Learning, DevOps..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleEnroll()}
              style={{ marginBottom: "0", flex: "1" }}
              disabled={loading}
            />

            <button
              className="primary-btn"
              style={{ marginTop: "0", width: "auto", padding: "12px 24px" }}
              onClick={() => handleEnroll()}
              disabled={loading}
            >
              {loading ? "⏳ Setting up..." : "🚀 Start"}
            </button>
          </div>

          {error && (
            <p style={{ color: "#f87171", fontSize: "13px", marginTop: "8px" }}>
              {error}
            </p>
          )}

          {loading && (
            <div className="generating-msg">
              ⚡ Setting up your personalized roadmap...
            </div>
          )}
        </div>

        {/* POPULAR COURSES */}
        <h3
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "12px",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
        >
          Popular Courses
        </h3>

        <div className="popular-grid">
          {POPULAR.map((c) => (
            <div
              key={c}
              className="popular-card"
              onClick={() => !loading && handleEnroll(c)}
              style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1 }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursePicker;