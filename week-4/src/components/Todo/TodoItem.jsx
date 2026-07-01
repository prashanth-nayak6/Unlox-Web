function TodoItem({ task, onToggle, onDelete }) {
  const { id, text, completed, createdAt } = task;

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          aria-label={`Mark "${text}" as ${completed ? 'active' : 'complete'}`}
        />
        <span className="check-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <polyline points="4 12 10 18 20 6" />
          </svg>
        </span>
      </label>

      <div className="todo-body">
        <span className="todo-text">{text}</span>
        <span className="todo-meta">{createdAt}</span>
      </div>

      <button
        type="button"
        className="icon-btn"
        onClick={() => onDelete(id)}
        aria-label={`Delete "${text}"`}
      >
        ✕
      </button>
    </li>
  );
}

export default TodoItem;
