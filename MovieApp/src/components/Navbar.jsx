import { FaSearch } from "react-icons/fa";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);

    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <BiCameraMovie />
        Movie App
      </Link>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Procure por um filme..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="submit">
            <FaSearch />{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
