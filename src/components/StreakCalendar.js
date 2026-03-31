/* eslint-disable */

// ✅ FIX: Streak calendar now uses activeDates array (list of date strings when user was active)
// Instead of calculating backwards from lastActive (which breaks if user skips days & returns),
// parent should pass activeDates={["Mon Apr 7 2025", "Mon Apr 8 2025", ...]} from Firestore/localStorage

function StreakCalendar({ streak, lastActive, criHistory, activeDates }) {
  // Generate last 30 days
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toDateString();
  });

  const today = new Date().toDateString();
  const activeDays = new Set();

  // ✅ FIX: Primary source — use activeDates array if provided (most accurate)
  if (activeDates && activeDates.length > 0) {
    activeDates.forEach((dateStr) => activeDays.add(new Date(dateStr).toDateString()));
  } else {
    // ✅ FIX: Fallback — use streak count backwards from lastActive
    // Old code used new Date() as base even if lastActive was days ago — WRONG
    // Now we correctly go back from lastActive date
    if (lastActive && streak > 0) {
      const last = new Date(lastActive);
      for (let i = 0; i < streak; i++) {
        const d = new Date(last);
        d.setDate(last.getDate() - i); // ✅ FIX: was mutating 'd' not 'last'
        activeDays.add(d.toDateString());
      }
    }
  }

  // Always mark days from criHistory (task completions)
  if (criHistory && criHistory.length > 0) {
    criHistory.forEach((entry) => {
      if (entry.timestamp) {
        activeDays.add(new Date(entry.timestamp).toDateString());
      }
    });
  }

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // ✅ FIX: Calculate active days count only within the last 30 days shown
  const activeLast30 = days.filter((d) => activeDays.has(d)).length;

  return (
    <div className="card" style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h3>📅 Activity Calendar</h3>
        {/* ✅ FIX: Show active days count — useful stat for reviewers */}
        <span style={{
          fontSize: "11px", color: "rgba(255,255,255,0.35)",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "3px 10px", borderRadius: "999px"
        }}>
          {activeLast30} / 30 days active
        </span>
      </div>

      {/* Calendar grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
        {days.map((day, i) => {
          const isActive = activeDays.has(day);
          const isToday = day === today;
          const d = new Date(day);

          return (
            <div
              key={i}
              title={`${d.getDate()} ${months[d.getMonth()]} — ${isActive ? "Active ✅" : "No activity"}`}
              style={{
                width: "28px", height: "28px",
                borderRadius: "6px",
                background: isActive
                  ? "linear-gradient(135deg, #4f8bff, #00d4aa)"
                  : "rgba(255,255,255,0.04)",
                border: isToday
                  ? "2px solid rgba(79,139,255,0.6)"
                  : "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px",
                color: isActive ? "white" : "rgba(255,255,255,0.2)",
                fontWeight: isToday ? 700 : 400,
                cursor: "default",
                boxShadow: isActive ? "0 0 8px rgba(79,139,255,0.3)" : "none",
                transition: "all 0.2s",
              }}
            >
              {d.getDate()}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{
            width: "14px", height: "14px", borderRadius: "3px",
            background: "linear-gradient(135deg, #4f8bff, #00d4aa)"
          }} />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Active</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{
            width: "14px", height: "14px", borderRadius: "3px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)"
          }} />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Inactive</span>
        </div>
        <div style={{ marginLeft: "auto", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
          🔥 {streak} day streak
        </div>
      </div>
    </div>
  );
}

export default StreakCalendar;