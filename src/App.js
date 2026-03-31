import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Architecture from "./pages/Architecture";
import LearnPage from "./pages/LearnPage";
import Quiz from "./pages/Quiz";
import Notes from "./pages/Notes";
import Certificate from "./pages/Certificate";
import SkillGap from "./pages/SkillGap";
import CoursePicker from "./pages/CoursePicker";
import CoursePage from "./pages/CoursePage";
import CodeEditor from "./pages/CodeEditor";
import ChatBot from "./components/ChatBot";
import ResumeScorer from "./pages/ResumeScorer";
import InterviewQA from "./pages/InterviewQA";

function ProtectedRoute({ user, children }) {
  if (user === "loading") return <div className="loading-screen">Loading...</div>;
  if (user === null) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState("loading");
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {user && user !== "loading" && <ChatBot />}
      <Routes>
        <Route path="/"             element={<Login />} />
        <Route path="/register"     element={<Register />} />
        <Route path="/profile"      element={<ProtectedRoute user={user}><Profile /></ProtectedRoute>} />
        <Route path="/dashboard"    element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
        <Route path="/roadmap"      element={<ProtectedRoute user={user}><Roadmap /></ProtectedRoute>} />
        <Route path="/architecture" element={<ProtectedRoute user={user}><Architecture /></ProtectedRoute>} />
        <Route path="/learn/:index" element={<ProtectedRoute user={user}><LearnPage /></ProtectedRoute>} />
        <Route path="/quiz/:index"  element={<ProtectedRoute user={user}><Quiz /></ProtectedRoute>} />
        <Route path="/notes"        element={<ProtectedRoute user={user}><Notes /></ProtectedRoute>} />
        <Route path="/certificate"  element={<ProtectedRoute user={user}><Certificate /></ProtectedRoute>} />
        <Route path="/skills"       element={<ProtectedRoute user={user}><SkillGap /></ProtectedRoute>} />
        <Route path="/courses"      element={<ProtectedRoute user={user}><CoursePicker /></ProtectedRoute>} />
        <Route path="/course/:name" element={<ProtectedRoute user={user}><CoursePage /></ProtectedRoute>} />
        <Route path="/editor"       element={<ProtectedRoute user={user}><CodeEditor /></ProtectedRoute>} />
        <Route path="/resume"       element={<ProtectedRoute user={user}><ResumeScorer /></ProtectedRoute>} />
        <Route path="/interview"    element={<ProtectedRoute user={user}><InterviewQA /></ProtectedRoute>} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;