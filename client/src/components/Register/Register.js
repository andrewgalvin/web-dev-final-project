import "../../app.css";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let EMAIL = data.get("email");
    let PASSWORD = data.get("password");
    let CONFIRMPASSWORD = data.get("confirm-password");

    // Validate user email using REGEX
    // regex taken from http://jsfiddle.net/ghvj4gy9/
    if (!validateEmail(EMAIL)) {
      document.getElementById("email").style.border = "1px solid red";
      return;
    } else {
      document.getElementById("email").style.border = "none";
    }

    // Validate passwords are the same
    if (PASSWORD !== CONFIRMPASSWORD) {
      document.getElementById("password").style.border = "1px solid red";
      document.getElementById("confirm-password").style.border =
        "1px solid red";
      return;
    } else {
      document.getElementById("password").style.border = "none";
      document.getElementById("confirm-password").style.border = "none";
    }

    fetch("/api/user/register", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
      }),
    })
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then(function (obj) {
        if (obj.status === 200) {
          alert("Account created!");
          navigate("/login");
        } else if (obj.status === 401) {
          alert("Email taken.");
        }
      });
  };
  return (
    <div className="register">
      <form onSubmit={handleRegisterClick}>
        <div className="register-container">
          <h1>
            <span>Register</span>
          </h1>
          <p>Fill in the below form to register.</p>

          <div className="register-input">
            <label for="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              id="email"
              required
            />

            <label for="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              required
            />

            <label for="confirm-password">
              <b>Confirm Password</b>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm-password"
              id="confirm-password"
              required
            />
            <button type="submit" class="registerbtn">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
