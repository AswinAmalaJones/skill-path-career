import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { navigate("/"); return; }
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setNotes(snap.data().notes || []);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    const user = auth.currentUser;
    if (!user) return;
    setSaving(true);
    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toLocaleDateString("en-IN")
    };
    const updated = [newNote, ...notes];
    await updateDoc(doc(db, "users", user.uid), { notes: updated });
    setNotes(updated);
    setTitle("");
    setContent("");
    setSaving(false);
  };

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (!user) return;
    const updated = notes.filter(n => n.id !== id);
    await updateDoc(doc(db, "users", user.uid), { notes: updated });
    setNotes(updated);
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="app-wrapper">
      <div className="top-bar">
        <h2>📝 My Notes</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>← Back</button>
      </div>

      <div className="note-form card">
        <h3>Add New Note</h3>
        <input
          className="note-input"
          placeholder="Note title (e.g. HTML Basics)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="note-textarea"
          placeholder="Write your notes here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="primary-btn"
          onClick={handleSave}
          disabled={saving || !title.trim() || !content.trim()}>
          {saving ? "Saving..." : "💾 Save Note"}
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="notes-empty">
          <p>No notes yet! Add your first note above 📝</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-card-header">
                <h4>{note.title}</h4>
                <span className="note-date">{note.createdAt}</span>
              </div>
              <p className="note-content">{note.content}</p>
              <button className="delete-btn" onClick={() => handleDelete(note.id)}>
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;