import { useState } from 'react';
import NoteForm from './NoteForm.jsx';
import NoteCard from './NoteCard.jsx';

const timeStamp = () =>
  new Date().toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const editingNote = notes.find((note) => note.id === editingId) ?? null;

  const saveNote = ({ title, body }) => {
    if (editingId) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId ? { ...note, title, body, updatedAt: timeStamp() } : note
        )
      );
      setEditingId(null);
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        title,
        body,
        updatedAt: timeStamp(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEdit = (id) => setEditingId(id);
  const cancelEdit = () => setEditingId(null);

  return (
    <section className="panel" aria-label="Notes">
      <NoteForm editingNote={editingNote} onSave={saveNote} onCancel={cancelEdit} />

      {notes.length === 0 ? (
        <p className="empty-state">No notes yet — jot one down above.</p>
      ) : (
        <div className="note-grid">
          {notes.map((note, index) => (
            <NoteCard
              key={note.id}
              note={note}
              index={index}
              onEdit={startEdit}
              onDelete={deleteNote}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default NotesApp;
