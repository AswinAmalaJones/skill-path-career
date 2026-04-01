import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Enter email & password");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (analytics) {
        logEvent(analytics, "login");
      }

      // Email verified check
      if (!userCredential.user.emailVerified) {
        setError("⚠️ Please verify your email first! Check your inbox.");
        await auth.signOut();
        setLoading(false);
        return;
      }

      const user = auth.currentUser;
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();

      if (!data.degree || !data.goal) {
        navigate("/profile");
      } else {
        navigate("/dashboard");
      }
    } catch {
      setError("Invalid login details");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!email) {
      setError("Enter email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError("✅ Reset email sent! Check your inbox.");
    } catch {
      setError("Failed to send reset email");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "40px" }}>🎯</span>
        </div>
        <h2>SkillPath Career Learning App</h2>
        <p style={{
          color: "#64748b",
          fontSize: "13px",
          textAlign: "center",
          marginBottom: "20px"
        }}>
          Your career learning platform
        </p>

        {error && (
          <p style={{
            color: error.includes("✅") ? "#4ade80" : "#f87171",
            marginBottom: "10px",
            fontSize: "13px",
            textAlign: "center"
          }}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login 🚀"}
        </button>

        <button
          onClick={handleForgotPassword}
          disabled={loading}
          style={{
            background: "rgba(255,255,255,0.04)",
            boxShadow: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#94a3b8"
          }}>
          Forgot Password?
        </button>

        <button
          onClick={() => navigate("/register")}
          disabled={loading}
          style={{
            background: "rgba(108,99,255,0.15)",
            boxShadow: "none",
            border: "1px solid rgba(108,99,255,0.3)",
            color: "#a78bfa"
          }}>
          New user? Register here
        </button>
      </div>
    </div>
  );
}

export default Login;