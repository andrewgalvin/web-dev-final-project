import "./Login.css";
import {useNavigate} from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let USERNAME = data.get("email");
    let PASSWORD = data.get("password");

    fetch("/api/user/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: USERNAME,
        password: PASSWORD,
      }),
    })
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then(function (obj) {
        if (obj.status === 200) {
          props.setLoggedIn(true);
          navigate("/dashboard");
        }
      });
  };
  
  return (
    <div className="login">
      <form onSubmit={handleLoginClick}>
        <div className="login-container">
          <h1>
            <span>Login</span>
          </h1>
          <p>Fill in the below form to login.</p>

          <div className="login-input">
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
            <button type="submit" class="loginbtn">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
