import { useMemo, useState } from 'react';
import TodoForm from './TodoForm.jsx';
import TodoItem from './TodoItem.jsx';

const FILTERS = ['all', 'active', 'completed'];

const timeStamp = () =>
  new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: timeStamp(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const visibleTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <section className="panel" aria-label="To-Do list">
      <TodoForm onAddTask={addTask} />

      {tasks.length > 0 && (
        <div className="todo-toolbar">
          <div className="filter-group" role="tablist" aria-label="Filter tasks">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
                role="tab"
                aria-selected={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="task-count">
            {remaining} {remaining === 1 ? 'task' : 'tasks'} left
          </span>
        </div>
      )}

      {visibleTasks.length === 0 ? (
        <p className="empty-state">
          {tasks.length === 0
            ? 'No tasks yet — add your first one above.'
            : `No ${filter} tasks to show.`}
        </p>
      ) : (
        <ul className="todo-list">
          {visibleTasks.map((task) => (
            <TodoItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))}
        </ul>
      )}

      {tasks.some((task) => task.completed) && (
        <button type="button" className="link-btn" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </section>
  );
}

export default TodoApp;
