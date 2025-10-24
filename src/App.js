import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);
  }, []);

   useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTodo = { id: Date.now(), text: task, completed: false };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="app">
      <h1 className="title">To-Do App</h1>

      <div className="progress-card">
        <div className="progress-text">
          <h2>Task Done</h2>
          <p>Keep it up!</p>
        </div>
        <div className="progress-circle">
          <h2>
            {completedCount}/{totalCount || 0}
          </h2>
        </div>
      </div>

      <div className="input-row">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Write your next task"
        />
        <button onClick={addTask} className="add-btn">
          +
        </button>
      </div>

       <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div
              className={`circle ${todo.completed ? "done" : ""}`}
              onClick={() => toggleComplete(todo.id)}
            ></div>

            <span
              className={todo.completed ? "completed" : ""}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>

            <div className="actions">
              <button onClick={() => toggleComplete(todo.id)} className="done-btn">
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button onClick={() => deleteTask(todo.id)} className="delete-btn">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
