import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setMessage("");
    setIsSuccess(false);

    if (!email || !password) {
      setMessage("Email and Password required");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(userCred.user);

      await setDoc(doc(db, "users", userCred.user.uid), {
        email: email,
        cri: 0,
        streak: 0,
        history: [],
        createdAt: serverTimestamp()
      });

      setIsSuccess(true);
      setMessage("✅ Verification email sent! Check your inbox and verify before logging in.");

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (error) {
      setIsSuccess(false);
      if (error.code === "auth/email-already-in-use") {
        setMessage("Email already registered! Please login.");
      } else if (error.code === "auth/weak-password") {
        setMessage("Password too weak! Use at least 6 characters.");
      } else {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "40px" }}>🚀</span>
        </div>
        <h2>Create Account</h2>
        <p style={{
          color: "#64748b",
          fontSize: "13px",
          textAlign: "center",
          marginBottom: "20px"
        }}>
          Join SkillPath AI — Start your career journey!
        </p>

        {message && (
          <p style={{
            color: isSuccess ? "#4ade80" : "#f87171",
            marginBottom: "12px",
            fontSize: "13px",
            textAlign: "center",
            lineHeight: "1.5"
          }}>
            {message}
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
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleRegister(); }}
        />

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Creating account..." : "Register 🚀"}
        </button>

        <button
          onClick={() => navigate("/")}
          disabled={loading}
          style={{
            background: "rgba(255,255,255,0.04)",
            boxShadow: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#94a3b8"
          }}>
          Already have account? Login
        </button>
      </div>
    </div>
  );
}

export default Register;