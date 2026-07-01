import { useState } from 'react';

function TodoForm({ onAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAddTask(trimmed);
    setText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What needs doing?"
        value={text}
        onChange={(event) => setText(event.target.value)}
        aria-label="New task"
      />
      <button type="submit" className="btn btn-coral" disabled={!text.trim()}>
        Add task
      </button>
    </form>
  );
}

export default TodoForm;
