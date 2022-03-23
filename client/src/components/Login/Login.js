import "./Login.css";

export default function Login(props) {
  return (
    <div className="login">
      <form>
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
