import "./Dashboard.css";
import Weather from "./Weather.js";
import Todo from "./Todo.js";

export default function Dashboard(props) {
  return (
    <div className="dashboard">
      <article>
        <div className="dashboard-weather">
          <Weather/>
        </div>
      </article>
      <article>
        <div className="dashboard-todo-list">
          <Todo/>
        </div>
      </article>
    </div>
  );
}
