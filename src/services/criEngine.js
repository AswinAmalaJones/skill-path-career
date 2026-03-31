// src/services/criEngine.js

export function calculateCRI({
  currentCri = 0,
  currentStreak = 0,
  score = 0,
  criWeight = 5
}) {

  // 🔥 Streak Logic
  const newStreak = score ? currentStreak + 1 : 0;

  // 🔥 CRI Logic
  let newCri = score
    ? currentCri + criWeight
    : currentCri - 2;

  // 🔒 Boundaries
  if (newCri < 0) newCri = 0;
  if (newCri > 100) newCri = 100;

  return {
    newCri,
    newStreak
  };
}