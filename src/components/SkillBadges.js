/* eslint-disable */
function SkillBadges({ userData }) {
  const cri = userData?.cri || 0;
  const streak = userData?.streak || 0;
  const quizzes = (userData?.completedQuizzes || []).length;
  const videos = (userData?.watchedVideos || []).length;
  const notes = (userData?.notes || []).length;

  const badges = [
    // Beginner badges
    { id: "first_task", icon: "⚡", name: "First Step", desc: "Complete your first task", earned: cri >= 5 },
    { id: "streak_3", icon: "🔥", name: "On Fire", desc: "3 day streak", earned: streak >= 3 },
    { id: "first_quiz", icon: "📝", name: "Quiz Starter", desc: "Complete first quiz", earned: quizzes >= 1 },
    { id: "first_video", icon: "📹", name: "Video Learner", desc: "Watch first video", earned: videos >= 1 },
    { id: "note_taker", icon: "✏️", name: "Note Taker", desc: "Add first note", earned: notes >= 1 },
    { id: "cri_10", icon: "🌱", name: "Getting Started", desc: "Reach CRI 10", earned: cri >= 10 },

    // Intermediate badges
    { id: "streak_7", icon: "🏅", name: "Week Warrior", desc: "7 day streak", earned: streak >= 7 },
    { id: "cri_25", icon: "📈", name: "Rising Star", desc: "Reach CRI 25", earned: cri >= 25 },
    { id: "quiz_3", icon: "🎯", name: "Quiz Master", desc: "Complete 3 quizzes", earned: quizzes >= 3 },
    { id: "video_3", icon: "🎬", name: "Binge Learner", desc: "Watch 3 videos", earned: videos >= 3 },
    { id: "cri_40", icon: "💪", name: "Hard Worker", desc: "Reach CRI 40", earned: cri >= 40 },
    { id: "streak_14", icon: "🔆", name: "Fortnight Focus", desc: "14 day streak", earned: streak >= 14 },

    // Advanced badges
    { id: "cri_50", icon: "🚀", name: "Halfway There", desc: "Reach CRI 50", earned: cri >= 50 },
    { id: "quiz_5", icon: "🧠", name: "Knowledge Base", desc: "Complete 5 quizzes", earned: quizzes >= 5 },
    { id: "video_5", icon: "🎓", name: "Video Scholar", desc: "Watch 5 videos", earned: videos >= 5 },
    { id: "streak_21", icon: "⭐", name: "Habit Former", desc: "21 day streak", earned: streak >= 21 },
    { id: "cri_65", icon: "🎯", name: "Goal Oriented", desc: "Reach CRI 65", earned: cri >= 65 },
    { id: "notes_5", icon: "📚", name: "Knowledge Builder", desc: "Add 5 notes", earned: notes >= 5 },

    // Expert badges
    { id: "cri_75", icon: "💎", name: "Almost Pro", desc: "Reach CRI 75", earned: cri >= 75 },
    { id: "streak_30", icon: "🏆", name: "Month Master", desc: "30 day streak", earned: streak >= 30 },
    { id: "quiz_10", icon: "🥇", name: "Quiz Champion", desc: "Complete 10 quizzes", earned: quizzes >= 10 },
    { id: "video_10", icon: "🎥", name: "Video Champion", desc: "Watch 10 videos", earned: videos >= 10 },
    { id: "cri_90", icon: "🌟", name: "Job Ready Star", desc: "Reach CRI 90", earned: cri >= 90 },
    { id: "cri_100", icon: "👑", name: "Career Ready!", desc: "Reach CRI 100", earned: cri >= 100 },
  ];

  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <div className="card" style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3>🏅 Skill Badges</h3>
        <span style={{
          fontSize: "12px", fontWeight: 700,
          color: "#ffd60a",
          background: "rgba(255,214,10,0.08)",
          border: "1px solid rgba(255,214,10,0.2)",
          padding: "4px 12px", borderRadius: "999px"
        }}>
          {earnedCount} / {badges.length} earned
        </span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "10px",
      }}>
        {badges.map((badge) => (
          <div
            key={badge.id}
            title={`${badge.name} — ${badge.desc}`}
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: "6px",
              padding: "12px 6px",
              borderRadius: "12px",
              background: badge.earned
                ? "rgba(255,214,10,0.08)"
                : "rgba(255,255,255,0.02)",
              border: badge.earned
                ? "1px solid rgba(255,214,10,0.25)"
                : "1px solid rgba(255,255,255,0.05)",
              opacity: badge.earned ? 1 : 0.4,
              transition: "all 0.2s",
              cursor: "default",
            }}
          >
            <div style={{ fontSize: "22px", filter: badge.earned ? "none" : "grayscale(100%)" }}>
              {badge.icon}
            </div>
            <div style={{
              fontSize: "9px", fontWeight: 600,
              color: badge.earned ? "rgba(255,214,10,0.9)" : "rgba(255,255,255,0.25)",
              textAlign: "center", lineHeight: 1.3,
              letterSpacing: "0.2px"
            }}>
              {badge.name}
            </div>
          </div>
        ))}
      </div>

      {earnedCount === 0 && (
        <div style={{
          textAlign: "center", padding: "12px",
          fontSize: "13px", color: "rgba(255,255,255,0.25)",
          marginTop: "8px"
        }}>
          Complete tasks to earn your first badge! 🌱
        </div>
      )}
    </div>
  );
}

export default SkillBadges;