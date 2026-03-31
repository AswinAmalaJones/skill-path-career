/* eslint-disable */
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc, getDoc, addDoc, collection,
  serverTimestamp, updateDoc, onSnapshot
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { generateTask, evaluateAnswer } from "../services/aiService";
import { calculateCRI } from "../services/criEngine";
import JobReadinessMeter from "../components/JobReadinessMeter";
import SkillBadges from "../components/SkillBadges";
import StreakCalendar from "../components/StreakCalendar";
import DailyReminder from "../components/DailyReminder";
import WeeklyTest from "../components/WeeklyTest";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cri, setCri] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [goal, setGoal] = useState("Full Stack Developer");
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [task, setTask] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showReasons, setShowReasons] = useState(false);
  const [criReasons, setCriReasons] = useState([]);
  const [dailyPlan, setDailyPlan] = useState(null);
  const [criHistory, setCriHistory] = useState([]);
  // ✅ FIX: activeDates for StreakCalendar accurate display
  const [activeDates, setActiveDates] = useState([]);
  const navigate = useNavigate();

  // ✅ Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/");
      else setUser(u);
    });
    return () => unsub();
  }, [navigate]);

  // ✅ Real-time Firestore listener + Streak fix
  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), async (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();

      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      let currentStreak = data.streak || 0;
      const lastActive = data.lastActive || "";

      // ✅ STREAK RESET — missed more than 1 day
      if (
        lastActive !== today &&
        lastActive !== yesterday &&
        currentStreak !== 0
      ) {
        currentStreak = 0;
        await updateDoc(doc(db, "users", user.uid), {
          streak: 0,
          taskDoneToday: false,
        });
      }

      setUserData(data);
      setCri(data.cri || 0);
      setStreak(currentStreak);
      setXp(data.xp || 0);
      setLevel(data.level || 1);
      setGoal(data.goal || "Full Stack Developer");
      setWatchedVideos(data.watchedVideos || []);
      setCompletedQuizzes(data.completedQuizzes || []);
      setCriHistory(data.criHistory || []);

      // ✅ FIX: Build activeDates from criHistory timestamps for StreakCalendar
      const dates = (data.criHistory || [])
        .filter(e => e.timestamp)
        .map(e => new Date(e.timestamp).toDateString());
      if (lastActive) dates.push(new Date(lastActive).toDateString());
      setActiveDates([...new Set(dates)]);

      // ✅ New day detect — task reset
      const taskDone = data.lastActive === today && data.taskDoneToday;
      setCompleted(taskDone);

      // ✅ FIX: getDailyPlan key must match Profile.js values exactly
      setDailyPlan(getDailyPlan(data.dailyHours || "1 hour"));
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  // ✅ CRI Reasons — auto update
  useEffect(() => {
    const reasons = [];
    if (cri === 0) {
      reasons.push("🎯 Complete your first task to start building your CRI!");
    } else {
      if (cri >= 10) reasons.push("✅ You've completed daily tasks consistently");
      if (streak >= 3) reasons.push(`🔥 You maintained a ${streak}-day learning streak`);
      if (streak >= 7) reasons.push("🏅 7+ day streak — excellent consistency!");
      if (watchedVideos.length > 0) reasons.push(`📹 Watched ${watchedVideos.length} learning videos`);
      if (completedQuizzes.length > 0) reasons.push(`📝 Completed ${completedQuizzes.length} quizzes`);
      if (cri >= 30) reasons.push("📚 Strong learning progress — keep going!");
      if (cri >= 50) reasons.push("🚀 Career readiness improving — almost job ready!");
      if (cri >= 80) reasons.push("🏆 Excellent! You're nearly job ready!");
    }
    setCriReasons(reasons);
  }, [cri, streak, watchedVideos, completedQuizzes]);

  // ✅ Load daily task
  useEffect(() => {
    if (!user || !goal || completed) return;
    loadTask();
  }, [user, goal, completed]);

  const loadTask = async () => {
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();
      const today = new Date().toDateString();

      if (data?.todayTask && data?.lastTaskDate === today) {
        setTask(data.todayTask);
        return;
      }

      const newTask = await generateTask(goal, cri);
      setTask(newTask);

      await updateDoc(doc(db, "users", user.uid), {
        todayTask: newTask,
        lastTaskDate: today,
        taskDoneToday: false,
      });
    } catch (err) {
      setTask({
        skillTag: "JavaScript",
        question: "Explain the difference between let, const and var in JavaScript with examples.",
        correctAnswer: "scope",
      });
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim() || submitting) return;
    setSubmitting(true);

    try {
      const result = await evaluateAnswer(task.question, answer, task.skillTag);
      setFeedback(result);

      const { newCri, newStreak } = calculateCRI({
        currentCri: cri,
        currentStreak: streak,
        score: result.score,
        criWeight: 5,
      });

      const today = new Date().toDateString();
      const newXp = result.score ? xp + 10 : xp;
      const newLevel = Math.floor(newXp / 50) + 1;

      const todayEntry = {
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        cri: newCri,
        timestamp: Date.now(),
      };

      await addDoc(collection(db, "users", user.uid, "history"), {
        question: task.question,
        answer,
        score: result.score,
        feedback: result.feedback,
        skillTag: task.skillTag,
        taskId: "rule-based",
        timestamp: serverTimestamp(),
      });

      await updateDoc(doc(db, "users", user.uid), {
        cri: newCri,
        streak: newStreak,
        xp: newXp,
        level: newLevel,
        lastActive: today,
        taskDoneToday: true,
        criHistory: [...criHistory.slice(-6), todayEntry],
      });

      setCompleted(true);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ FIX: onCriUpdate for WeeklyTest — updates Firestore directly
  const handleCriUpdate = async (bonus, reason) => {
    if (!user) return;
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();
      const newCri = Math.min((data.cri || 0) + bonus, 100);
      const todayEntry = {
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        cri: newCri,
        timestamp: Date.now(),
        reason,
      };
      await updateDoc(doc(db, "users", user.uid), {
        cri: newCri,
        criHistory: [...(data.criHistory || []).slice(-6), todayEntry],
      });
    } catch (err) {
      console.error("CRI update error:", err);
    }
  };

  // ✅ FIX: keys now match Profile.js exactly — "30 mins", "1 hour", "2 hours"
  const getDailyPlan = (hours) => {
    const plans = {
      "30 mins":  { task: "1 Quick Task", video: "Skip today", quiz: "Skip today" },
      "1 hour":   { task: "1 Task", video: "1 Video", quiz: "Skip today" },
      "2 hours":  { task: "1 Task", video: "1 Video", quiz: "1 Quiz" },
      "3+ hours": { task: "2 Tasks", video: "2 Videos", quiz: "1 Quiz + Notes" },
    };
    return plans[hours] || plans["1 hour"];
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  const xpProgress = ((xp % 50) / 50) * 100;

  return (
    <div className="app-wrapper">
      {/* Top Bar */}
      <div className="top-bar">
        <h2>🎯 SkillPath AI</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="level-badge">LVL {level}</span>
          <button className="back-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* XP Bar */}
      <div className="xp-bar">
        <div className="xp-fill" style={{ width: `${xpProgress}%` }} />
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-num">{cri}%</div>
          <div className="stat-label">CRI Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{streak}</div>
          <div className="stat-label">Day Streak 🔥</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{xp}</div>
          <div className="stat-label">XP Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{watchedVideos.length}</div>
          <div className="stat-label">Videos</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{completedQuizzes.length}</div>
          <div className="stat-label">Quizzes</div>
        </div>
      </div>

      {/* Daily Reminder Banner */}
      {userData && (
        <DailyReminder
          lastActive={userData.lastActive}
          taskDoneToday={userData.taskDoneToday}
          streak={streak}
        />
      )}

      {/* Job Readiness Meter */}
      <JobReadinessMeter
        cri={cri}
        streak={streak}
        videosWatched={watchedVideos.length}
        quizzesCompleted={completedQuizzes.length}
      />

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left — CRI Card */}
        <div className="card">
          <h3>Career Readiness Index</h3>
          <div className="goal-text">{goal}</div>

          <div className="cri-wrapper">
            <p>Your CRI: <strong>{cri}%</strong></p>
            <div className="cri-bar">
              <div className="cri-fill" style={{ width: `${cri}%` }} />
            </div>
          </div>

          <button
            className="back-btn"
            style={{ marginTop: "12px", width: "100%" }}
            onClick={() => setShowReasons(!showReasons)}
          >
            {showReasons ? "Hide" : "Why this score? 🤔"}
          </button>

          {showReasons && (
            <div className="cri-reasons">
              {criReasons.map((r, i) => (
                <div key={i} className="cri-reason-item">{r}</div>
              ))}
            </div>
          )}

          <div className="streak-badge">🔥 {streak} Day Streak</div>

          {/* Daily Plan */}
          {dailyPlan && (
            <div style={{
              marginTop: "16px", padding: "14px",
              background: "rgba(79,139,255,0.06)",
              border: "1px solid rgba(79,139,255,0.15)",
              borderRadius: "12px"
            }}>
              <div style={{
                fontSize: "10px", color: "rgba(79,139,255,0.8)",
                fontWeight: 700, letterSpacing: "1.5px",
                marginBottom: "10px", textTransform: "uppercase"
              }}>
                📅 Today's Plan
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "2" }}>
                ✅ Task: {dailyPlan.task}<br />
                🎥 Video: {dailyPlan.video}<br />
                📝 Quiz: {dailyPlan.quiz}
              </div>
            </div>
          )}

          {/* CRI Mini Chart */}
          {criHistory.length > 0 && (
            <div style={{
              marginTop: "16px", padding: "14px",
              background: "rgba(0,212,170,0.04)",
              border: "1px solid rgba(0,212,170,0.12)",
              borderRadius: "12px"
            }}>
              <div style={{
                fontSize: "10px", color: "rgba(0,212,170,0.8)",
                fontWeight: 700, letterSpacing: "1.5px",
                marginBottom: "12px", textTransform: "uppercase"
              }}>
                📈 CRI Progress (Last 7 Days)
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "60px" }}>
                {criHistory.slice(-7).map((entry, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                      {entry.cri}
                    </div>
                    <div style={{
                      width: "100%",
                      height: `${Math.max((entry.cri / 100) * 36, 4)}px`,
                      background: "linear-gradient(180deg, #00d4aa, #4f8bff)",
                      borderRadius: "3px",
                      transition: "height 0.5s ease"
                    }} />
                    <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>
                      {entry.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — Task Card */}
        <div className="card task-card mission-glow">
          <h3>Daily Mission</h3>

          {completed ? (
            <div className="task-complete">
              <div style={{ fontSize: "52px", marginBottom: "12px" }}>🎉</div>
              <h3>Mission Complete!</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "20px" }}>
                Come back tomorrow for your next mission!
              </p>

              {feedback && (
                <div className="ai-feedback">
                  <div className="feedback-label">📋 Feedback</div>
                  <p>{feedback.feedback}</p>
                  <span className="skill-level-badge">{feedback.skillLevel}</span>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                <button className="primary-btn" onClick={() => navigate("/roadmap")}>
                  📍 View Roadmap
                </button>
                <button className="primary-btn"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onClick={() => navigate("/skills")}>
                  📊 Skill Gap Analysis
                </button>
              </div>
            </div>
          ) : task ? (
            <>
              <span className="skill-tag">{task.skillTag}</span>
              <p className="question">{task.question}</p>
              <textarea
                placeholder="Type your answer here... explain with examples for better score!"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button
                className="primary-btn"
                onClick={handleSubmit}
                disabled={submitting || !answer.trim()}
              >
                {submitting ? "⚡ Evaluating..." : "Submit & Gain XP ⚡"}
              </button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.3)" }}>
              Loading your mission...
            </div>
          )}
        </div>
      </div>

      {/* ✅ FIX: activeDates passed to StreakCalendar */}
      {userData && (
        <StreakCalendar
          streak={streak}
          lastActive={userData.lastActive}
          criHistory={criHistory}
          activeDates={activeDates}
        />
      )}

      {/* Skill Badges */}
      {userData && <SkillBadges userData={userData} />}

      {/* ✅ FIX: onCriUpdate passed to WeeklyTest */}
      {userData && (
        <WeeklyTest
          userData={userData}
          onCriUpdate={handleCriUpdate}
        />
      )}

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <button title="Dashboard" onClick={() => navigate("/dashboard")}>🏠</button>
        <button title="Roadmap" onClick={() => navigate("/roadmap")}>🗺️</button>
        <button title="Courses" onClick={() => navigate("/courses")}>📚</button>
        <button title="Skill Gap" onClick={() => navigate("/skills")}>📊</button>
        <button title="Code Editor" onClick={() => navigate("/editor")}>💻</button>
        <button title="Resume" onClick={() => navigate("/resume")}>📄</button>
        <button title="Notes" onClick={() => navigate("/notes")}>📝</button>
        <button title="Certificate" onClick={() => navigate("/certificate")}>🏆</button>
        <button title="Interview" onClick={() => navigate("/interview")}>🎤</button>
        <button title="Architecture" onClick={() => navigate("/architecture")}>🏗️</button>
      </div>
    </div>
  );
}

export default Dashboard;