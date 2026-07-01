const TILTS = ['-2deg', '1.5deg', '-1deg', '2deg', '0.5deg'];

function NoteCard({ note, index, onEdit, onDelete }) {
  const { id, title, body, updatedAt } = note;
  const tilt = TILTS[index % TILTS.length];

  return (
    <article className="note-card" style={{ '--tilt': tilt }}>
      <span className="note-pin" aria-hidden="true" />
      <h3 className="note-title">{title}</h3>
      {body && <p className="note-body">{body}</p>}
      <div className="note-footer">
        <span className="note-meta">{updatedAt}</span>
        <div className="note-actions">
          <button type="button" className="icon-btn" onClick={() => onEdit(id)} aria-label="Edit note">
            ✎
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => onDelete(id)}
            aria-label="Delete note"
          >
            ✕
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
