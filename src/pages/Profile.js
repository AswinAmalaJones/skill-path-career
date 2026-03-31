import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const CAREER_GOALS = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "Deep Learning Engineer",
  "Python Developer",
  "Java Developer",
  "Android Developer",
  "iOS Developer",
  "Flutter Developer",
  "React Native Developer",
  "Django Developer",
  "UI UX Designer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cybersecurity Engineer",
  "Blockchain Developer",
  "Game Developer",
  "Database Administrator",
  "NLP Engineer",
  "Computer Vision Engineer",
  "Embedded Systems Engineer",
  "Salesforce Developer",
];

function Profile() {
  const [degree, setDegree] = useState("");
  const [goal, setGoal] = useState("");
  const [dailyHours, setDailyHours] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    const user = auth.currentUser;
    if (!user) return;

    if (!degree || !goal || !dailyHours) {
      setError("Please fill all fields");
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), {
        degree,
        goal,
        dailyHours,
        cri: 0,
        streak: 0,
        roadmap: [],
        lastActive: new Date().toDateString()
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save profile");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>🎯 Student Profile</h2>
        <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px", textAlign: "center" }}>
          Tell us about yourself to get a personalized learning path!
        </p>

        {error && (
          <p style={{ color: "#f87171", marginBottom: "12px", fontSize: "13px" }}>
            ⚠️ {error}
          </p>
        )}

        <input
          placeholder="Degree (e.g. BSc Computer Science)"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />

        {/* Career Goal Dropdown */}
        <div style={{ marginBottom: "16px" }}>
          <p style={{ color: "#a78bfa", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>
            🎯 Career Goal
          </p>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: goal
                ? "1px solid rgba(108,99,255,0.5)"
                : "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: goal ? "#e2e8f0" : "#64748b",
              fontSize: "14px",
              cursor: "pointer",
              outline: "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <option value="" disabled>Select your career goal...</option>
            {CAREER_GOALS.map((g) => (
              <option
                key={g}
                value={g}
                style={{ background: "#1e293b", color: "#e2e8f0" }}
              >
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Daily Hours */}
        <p style={{ color: "#a78bfa", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>
          ⏱️ Daily Learning Time
        </p>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {["30 mins", "1 hour", "2 hours"].map((time) => (
            <button
              key={time}
              onClick={() => setDailyHours(time)}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "12px",
                border: dailyHours === time
                  ? "2px solid #6C63FF"
                  : "2px solid rgba(255,255,255,0.1)",
                background: dailyHours === time
                  ? "rgba(108,99,255,0.3)"
                  : "rgba(255,255,255,0.05)",
                color: dailyHours === time ? "#a78bfa" : "#94a3b8",
                cursor: "pointer",
                fontWeight: dailyHours === time ? "700" : "400",
                fontSize: "13px",
                transition: "all 0.2s",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {time}
            </button>
          ))}
        </div>

        <button onClick={handleSubmit}>
          Start My Learning Journey 🚀
        </button>
      </div>
    </div>
  );
}

export default Profile;