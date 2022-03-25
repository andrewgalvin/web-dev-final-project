import "./Todo.css";

export default function Todo(props) {
  return (
    <div className="todo">
      <div className="todo-title">
        <h5>Your Todo List</h5>
        <div>
          <input
            type="text"
            name="new-todo"
            className="new-todo"
            placeholder="Enter a new todo"
          ></input>
          <button className="new-todo-btn">Add</button>
        </div>
      </div>
      <div className="todo-list">
        <div className="todo-item">
          <input type="checkbox" />
          <p>Item 1</p>
        </div>
        <div className="todo-item">
          <input type="checkbox" />
          <p>Item 2</p>
        </div>
        <div className="todo-item">
          <input type="checkbox" />
          <p>Item 3</p>
        </div>
        <div className="todo-item">
          <input type="checkbox" />
          <p>Item 4</p>
        </div>
        <div className="todo-item">
          <input type="checkbox" />
          <p>Item 5</p>
        </div>
        <div className="todo-item">
          <input type="checkbox" />
          <p>Item 6</p>
        </div>
        <div className="todo-item">
          <input type="checkbox" />
          <p>Item 7</p>
        </div>
        <div className="todo-item">
          <input type="checkbox" />
          <p>Item 8</p>
        </div>
      </div>
    </div>
  );
}
