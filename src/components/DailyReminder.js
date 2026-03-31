/* eslint-disable */
function DailyReminder({ lastActive, taskDoneToday, streak }) {
  const today = new Date().toDateString();
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(23, 59, 59, 999);
  const hoursLeft = Math.floor((midnight - now) / (1000 * 60 * 60));
  const minsLeft = Math.floor(((midnight - now) % (1000 * 60 * 60)) / (1000 * 60));

  // Already done today — no reminder
  if (taskDoneToday || lastActive === today) return null;

  // Streak about to break warning
  const isUrgent = hoursLeft < 3;
  const hasStreak = streak > 0;

  return (
    <div style={{
      background: isUrgent
        ? "rgba(255,69,58,0.08)"
        : "rgba(255,214,10,0.06)",
      border: `1px solid ${isUrgent ? "rgba(255,69,58,0.25)" : "rgba(255,214,10,0.2)"}`,
      borderRadius: "16px",
      padding: "16px 20px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      animation: "fadeUp 0.3s ease",
    }}>
      {/* Icon */}
      <div style={{ fontSize: "28px", flexShrink: 0 }}>
        {isUrgent ? "🚨" : "⏰"}
      </div>

      {/* Message */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: "14px", fontWeight: 700,
          color: isUrgent ? "#ff453a" : "#ffd60a",
          marginBottom: "4px",
        }}>
          {isUrgent
            ? `⚠️ Only ${hoursLeft}h ${minsLeft}m left — Don't break your streak!`
            : "📚 Complete today's mission to maintain your streak!"}
        </div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
          {hasStreak
            ? `🔥 You have a ${streak}-day streak — don't lose it!`
            : "Start your streak today — consistency is key to job readiness!"}
        </div>
      </div>

      {/* Time left */}
      <div style={{
        textAlign: "center", flexShrink: 0,
        padding: "8px 14px",
        background: isUrgent ? "rgba(255,69,58,0.1)" : "rgba(255,214,10,0.08)",
        borderRadius: "10px",
        border: `1px solid ${isUrgent ? "rgba(255,69,58,0.2)" : "rgba(255,214,10,0.15)"}`,
      }}>
        <div style={{
          fontSize: "18px", fontWeight: 800,
          color: isUrgent ? "#ff453a" : "#ffd60a",
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.5px",
        }}>
          {hoursLeft}h {minsLeft}m
        </div>
        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.5px" }}>
          REMAINING
        </div>
      </div>
    </div>
  );
}

export default DailyReminder;