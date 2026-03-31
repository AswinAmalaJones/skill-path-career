/* eslint-disable */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { scoreResume } from "../services/aiService";

function ResumeScorer() {
  const [resumeText, setResumeText] = useState("");
  const [role, setRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState("upload"); // upload or paste
  const [fileName, setFileName] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Extract text from PDF using FileReader
  const extractTextFromFile = async (file) => {
    setExtracting(true);
    setFileName(file.name);

    try {
      // For .txt files
      if (file.type === "text/plain") {
        const text = await file.text();
        setResumeText(text);
        setExtracting(false);
        return;
      }

      // For PDF files — extract using PDF.js
      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();

        // Load PDF.js from CDN
        if (!window.pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        }

        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n";
        }

        setResumeText(fullText.trim());
        setExtracting(false);
        return;
      }

      // For .doc/.docx — read as text (basic)
      const text = await file.text();
      setResumeText(text);
      setExtracting(false);

    } catch (err) {
      console.error("File extract error:", err);
      setExtracting(false);
      setResumeText("");
      setFileName("");
      alert("Could not read file. Please paste your resume text instead.");
    }
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) extractTextFromFile(file);
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) extractTextFromFile(file);
  };

  const handleScore = async () => {
    if (!resumeText.trim() || !role.trim()) return;
    setLoading(true);
    const data = await scoreResume(resumeText, role);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="app-wrapper">
      <div className="top-bar">
        <h2>📄 Resume Scorer</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>← Back</button>
      </div>

      {!result ? (
        <div className="card">
          <h3>Resume Scorer</h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>
            Upload your resume or paste text — get instant AI score with improvement tips!
          </p>

          {/* Toggle — Upload or Paste */}
          <div style={{
            display: "flex", gap: "8px", marginBottom: "20px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px", padding: "4px"
          }}>
            {["upload", "paste"].map((mode) => (
              <button
                key={mode}
                onClick={() => { setUploadMode(mode); setResumeText(""); setFileName(""); }}
                style={{
                  flex: 1, padding: "10px",
                  borderRadius: "10px", border: "none",
                  background: uploadMode === mode
                    ? "linear-gradient(135deg, #4f8bff, #00d4aa)"
                    : "transparent",
                  color: uploadMode === mode ? "white" : "rgba(255,255,255,0.4)",
                  fontWeight: 600, fontSize: "13px",
                  cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "var(--font-body)",
                }}
              >
                {mode === "upload" ? "📎 Upload File" : "📝 Paste Text"}
              </button>
            ))}
          </div>

          {/* Target Role */}
          <input
            className="note-input"
            placeholder="Target Role (e.g. Full Stack Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          {/* Upload Mode */}
          {uploadMode === "upload" ? (
            <div>
              {/* Drag & Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? "rgba(79,139,255,0.6)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "16px",
                  padding: "48px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: dragOver ? "rgba(79,139,255,0.06)" : "rgba(255,255,255,0.02)",
                  transition: "all 0.2s",
                  marginBottom: "12px",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                  {extracting ? "⏳" : fileName ? "✅" : "📄"}
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>
                  {extracting ? "Extracting text..." :
                   fileName ? fileName :
                   "Drop your resume here"}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                  {extracting ? "Please wait..." :
                   fileName ? "✅ Text extracted successfully!" :
                   "Supports PDF, TXT files • Click to browse"}
                </div>

                {/* Progress indicator */}
                {extracting && (
                  <div style={{
                    marginTop: "16px", height: "3px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "999px", overflow: "hidden"
                  }}>
                    <div style={{
                      height: "100%", width: "60%",
                      background: "linear-gradient(90deg, #4f8bff, #00d4aa)",
                      borderRadius: "999px",
                      animation: "slideIn 1s ease infinite"
                    }} />
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {/* Show extracted text preview */}
              {resumeText && !extracting && (
                <div style={{
                  padding: "12px 16px",
                  background: "rgba(0,212,170,0.06)",
                  border: "1px solid rgba(0,212,170,0.2)",
                  borderRadius: "10px",
                  fontSize: "12px",
                  color: "rgba(0,212,170,0.8)",
                  marginBottom: "8px"
                }}>
                  ✅ {resumeText.split(" ").length} words extracted from {fileName}
                </div>
              )}
            </div>
          ) : (
            /* Paste Mode */
            <textarea
              className="note-textarea"
              style={{ minHeight: "200px" }}
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          )}

          <button
            className="primary-btn"
            onClick={handleScore}
            disabled={loading || !resumeText.trim() || !role.trim() || extracting}
          >
            {loading ? "⚡ Analyzing..." :
             extracting ? "⏳ Extracting..." :
             "🚀 Score My Resume"}
          </button>
        </div>
      ) : (
        <div>
          {/* Score Cards */}
          <div className="resume-score-card">
            <div className="resume-score-circle">
              <div className="resume-score-num">{result.overallScore}</div>
              <div className="resume-score-label">Overall Score</div>
            </div>
            <div className="resume-score-circle ats">
              <div className="resume-score-num">{result.atsScore}</div>
              <div className="resume-score-label">ATS Score</div>
            </div>
          </div>

          <p className="resume-verdict">{result.verdict}</p>

          <div className="card" style={{ marginBottom: "16px" }}>
            <h3>✅ Strengths</h3>
            {result.strengths.map((s, i) => (
              <div key={i} className="resume-point strength">✓ {s}</div>
            ))}
          </div>

          <div className="card" style={{ marginBottom: "16px" }}>
            <h3>📈 Improvements</h3>
            {result.improvements.map((s, i) => (
              <div key={i} className="resume-point improve">→ {s}</div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button className="primary-btn" onClick={() => {
              setResult(null);
              setResumeText("");
              setFileName("");
              setRole("");
            }}>
              Score Another Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeScorer;