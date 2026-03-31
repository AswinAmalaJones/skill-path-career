/* eslint-disable */
function JobReadinessMeter({ cri, streak, videosWatched, quizzesCompleted }) {
  const getStatus = (cri) => {
    if (cri < 25) return { label: "Just Starting 🌱", color: "#64748b", bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.2)", next: "Complete daily tasks to build your CRI!" };
    if (cri < 50) return { label: "Getting There 📈", color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", next: "Keep your streak going and watch more videos!" };
    if (cri < 75) return { label: "Almost Ready 🎯", color: "#6C63FF", bg: "rgba(108,99,255,0.08)", border: "rgba(108,99,255,0.2)", next: "Practice more quizzes and improve weak skills!" };
    return { label: "Job Ready! 🚀", color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", next: "Start applying to companies now!" };
  };

  const status = getStatus(cri);

  const stages = [
    { label: "Just Starting", min: 0, max: 25 },
    { label: "Getting There", min: 25, max: 50 },
    { label: "Almost Ready", min: 50, max: 75 },
    { label: "Job Ready", min: 75, max: 100 },
  ];

  const currentStage = stages.findIndex(s => cri >= s.min && cri < s.max);
  const activeStage = cri >= 100 ? 3 : currentStage;

  return (
    <div style={{
      background: status.bg,
      border: `1px solid ${status.border}`,
      borderRadius: "20px",
      padding: "20px 24px",
      marginBottom: "20px",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "16px"
      }}>
        <div style={{
          fontSize: "10px", fontWeight: 700,
          letterSpacing: "2px", textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)"
        }}>
          💼 Job Readiness Meter
        </div>
        <div style={{
          fontSize: "13px", fontWeight: 700,
          color: status.color,
          background: `${status.bg}`,
          border: `1px solid ${status.border}`,
          padding: "4px 14px",
          borderRadius: "999px",
        }}>
          {status.label}
        </div>
      </div>

      {/* Stage Progress */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
        {stages.map((stage, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{
              height: "6px",
              borderRadius: "999px",
              background: i <= activeStage
                ? `linear-gradient(90deg, #4f8bff, #00d4aa)`
                : "rgba(255,255,255,0.05)",
              transition: "all 0.5s ease",
              boxShadow: i <= activeStage ? "0 0 8px rgba(79,139,255,0.3)" : "none",
            }} />
            <div style={{
              fontSize: "9px",
              color: i <= activeStage ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
              textAlign: "center",
              letterSpacing: "0.3px",
            }}>
              {stage.label}
            </div>
          </div>
        ))}
      </div>

      {/* CRI Score big */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "14px" }}>
        <div style={{
          fontSize: "48px", fontWeight: 800,
          fontFamily: "var(--font-display)",
          color: status.color,
          letterSpacing: "-2px",
          lineHeight: 1,
        }}>
          {cri}%
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>
            Career Readiness Index
          </div>
          <div style={{ fontSize: "12px", color: status.color, fontWeight: 600 }}>
            {status.next}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "10px" }}>
        {[
          { label: "Streak", value: `${streak}d`, icon: "🔥" },
          { label: "Videos", value: videosWatched, icon: "📹" },
          { label: "Quizzes", value: quizzesCompleted, icon: "📝" },
        ].map((item, i) => (
          <div key={i} style={{
            flex: 1, textAlign: "center",
            padding: "10px 8px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
          }}>
            <div style={{ fontSize: "18px", marginBottom: "2px" }}>{item.icon}</div>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-display)" }}>
              {item.value}
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.5px" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobReadinessMeter;