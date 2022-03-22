import "../../app.css";
import "./Register.css";

export default function Register(props) {
  return (
    <div className="register">
      <form>
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

            <label for="password-Confirm">
              <b>Confirm Password</b>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="password-Confirm"
              id="password-Confirm"
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
