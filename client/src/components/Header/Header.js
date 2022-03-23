import "../../app.css";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header(props) {
  const handleLogoutClick = (e) => {
    fetch("/api/user/session/remove", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      credentials: "same-origin",
    })
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then(function (obj) {
        if (obj.status === 200) {
          props.setLoggedIn(false);
        }
      });
  };

  return (
    <header>
      <div className="header__container">
        <h1>Web Dev Final Project</h1>
        <nav className="header__nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            {!props.loggedIn && (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>{" "}
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}

            {props.loggedIn && (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li onClick={handleLogoutClick}>
                  <Link to="/login">Logout</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
