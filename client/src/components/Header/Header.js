import "../../app.css";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header>
      <div class="header__container">
        <h1>Web Dev Final Project</h1>
        <nav class="header__nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
