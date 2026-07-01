# Desk — To-Do App + Notes App (React)

A single-page React application combining a **To-Do list** and a **Notes app**, built for
the Minor Project 04 brief. Switch between the two using the tab rail at the top; each
section is fully self-contained with its own state.

## Features

### To-Do App
- Add new tasks via a controlled form
- Mark tasks complete / active with an animated checkbox
- Delete individual tasks
- Filter by **All / Active / Completed**
- Live "tasks left" counter
- "Clear completed" shortcut
- Empty states for no tasks / no matches in a filter

### Notes App
- Create notes with a title and body
- Edit an existing note (form pre-fills, with a **Cancel** option)
- Delete notes
- Notes render as a responsive grid of sticky-note style cards, each lightly
  rotated for a hand-placed feel
- Empty state when there are no notes yet

## Tech Stack
- React 18 (functional components + hooks only)
- Vite (dev server & build tool)
- Plain CSS with custom properties (no UI framework)
- Modern JavaScript: arrow functions, destructuring, array methods
  (`map`, `filter`, `some`), ES6 modules, `crypto.randomUUID()`

## Project Structure

```
todo-notes-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Tab navigation between To-Do and Notes
    ├── index.css             # Design system & responsive styles
    └── components/
        ├── Todo/
        │   ├── TodoApp.jsx    # State: tasks, filter, add/toggle/delete
        │   ├── TodoForm.jsx   # Controlled input for adding a task
        │   └── TodoItem.jsx   # Single task row
        └── Notes/
            ├── NotesApp.jsx   # State: notes, editing, save/delete
            ├── NoteForm.jsx   # Create/edit form (reused for both)
            └── NoteCard.jsx   # Single sticky-note card
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open the printed local URL (usually http://localhost:5173)
```

### Build for production

```bash
npm run build
npm run preview
```

## Notes on State
All data (tasks and notes) lives in React state via `useState` and resets on page
refresh — there is no backend or persistence layer, in line with the project's
scope (state management, not storage).

## Author
Built as part of the Minor Project 04 submission — To-Do App + Notes App in React.
