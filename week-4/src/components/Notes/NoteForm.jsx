import { useEffect, useState } from 'react';

const EMPTY = { title: '', body: '' };

function NoteForm({ editingNote, onSave, onCancel }) {
  const [draft, setDraft] = useState(EMPTY);

  // Load the note into the form whenever a different note is selected for editing.
  useEffect(() => {
    setDraft(editingNote ? { title: editingNote.title, body: editingNote.body } : EMPTY);
  }, [editingNote]);

  const handleChange = (field) => (event) => {
    setDraft((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = draft.title.trim();
    const body = draft.body.trim();
    if (!title && !body) return;

    onSave({ title: title || 'Untitled note', body });
    setDraft(EMPTY);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="note-title-input"
        placeholder="Note title"
        value={draft.title}
        onChange={handleChange('title')}
        aria-label="Note title"
      />
      <textarea
        className="note-body-input"
        placeholder="Write something down…"
        rows={3}
        value={draft.body}
        onChange={handleChange('body')}
        aria-label="Note content"
      />
      <div className="note-form-actions">
        {editingNote && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-amber">
          {editingNote ? 'Save changes' : 'Add note'}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
