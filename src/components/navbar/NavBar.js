import { Link } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <nav>
        <Link to="/" className="title-nav">
          <h1>Cook4U</h1>
        </Link>

        <Link to="/about" className="about">
          <h4>About </h4>
        </Link>

        <Link to="/create">
          <button className="create-btn">Create</button>
        </Link>
      </nav>
    </div>
  );
}
