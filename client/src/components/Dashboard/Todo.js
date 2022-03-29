import { useEffect, useState } from "react";
import "./Todo.css";

export default function Todo(props) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/user/todos", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then(function (obj) {
        if (obj.status === 200) {
          setTodos(obj.body.todos);
        } else {
          alert(obj.body.message);
        }
      });
  }, []);

  const handleAddTodoClick = (e) => {
    // Prevent refresh
    e.preventDefault();
    var newTodo = document.getElementById("new-todo").value;
    if (newTodo !== "") {
      fetch("/api/user/new/todo", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: newTodo }),
      })
        .then((r) =>
          r.json().then((data) => ({ status: r.status, body: data }))
        )
        .then(function (obj) {
          if (obj.status === 200) {
            setTodos(obj.body.todos);
          } else {
            alert(obj.body.message);
          }
        });
    } else {
      alert("Cannot add blank todo");
    }
  };

  const handleRemoveTodoClick = (todo) => {
    // Prevent refresh
    fetch("/api/user/remove/todo", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id:  todo._id}),
    })
      .then((r) =>
        r.json().then((data) => ({ status: r.status, body: data }))
      )
      .then(function (obj) {
        if (obj.status === 200) {
          setTodos(obj.body.todos);
        } else {
          alert(obj.body.message);
        }
      });

  };

  return (
    <div className="todo">
      <div className="todo-title">
        <h5>Your Todo List</h5>
        <div>
          <input
            type="text"
            name="new-todo"
            className="new-todo"
            id="new-todo"
            placeholder="Enter a new todo"
          />
          <button className="new-todo-btn" onClick={handleAddTodoClick}>
            Add
          </button>
        </div>
      </div>
      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => {
            return (
              <div className="todo-item">
                <p>{todo.todo}</p>

                <button
                  className="remove-todo-btn"
                  onClick={(e) => handleRemoveTodoClick(todo)}
                >
                  Remove
                </button>
              </div>
            );
          })
        ) : (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <p style={{fontWeight: "bold", marginTop: "20px", fontSize: "18px"}}>No todos yet... add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
