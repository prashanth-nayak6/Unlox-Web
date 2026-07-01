import { useState } from 'react';
import TodoApp from './components/Todo/TodoApp.jsx';
import NotesApp from './components/Notes/NotesApp.jsx';

const TABS = [
  { id: 'todo', label: 'To-Do', hint: 'Tasks for today' },
  { id: 'notes', label: 'Notes', hint: 'Things to remember' },
];

function App() {
  const [activeTab, setActiveTab] = useState('todo');

  return (
    <div className="desk">
      <header className="desk-header">
        <div className="desk-title">
          <span className="desk-mark" aria-hidden="true">
            ✎
          </span>
          <div>
            <h1>Desk</h1>
            <p>A tidy corner for tasks and notes</p>
          </div>
        </div>

        <nav className="tab-rail" role="tablist" aria-label="App sections">
          {TABS.map(({ id, label, hint }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              className={`tab-btn tab-${id} ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <span className="tab-label">{label}</span>
              <span className="tab-hint">{hint}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="desk-surface">
        {activeTab === 'todo' ? <TodoApp /> : <NotesApp />}
      </main>

      <footer className="desk-footer">
        <p>Built with React &middot; state lives in this session only</p>
      </footer>
    </div>
  );
}

export default App;
