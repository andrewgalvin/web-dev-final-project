import "./Home.css";
import {Link} from "react-router-dom";

export default function Home(props) {
  return (
    <div className="home">
      <div className="home-title">
        <h1>Never lose track of your plans.</h1>
        <p>Daily Dashboard monitors your local weather and keeps track of your todo-lists all in one place.</p>
        <div className="home-title-btn">
        <Link to='/register'><button className="home-btn">Get Started Today</button></Link>
        </div>
      </div>
    </div>
  );
}
