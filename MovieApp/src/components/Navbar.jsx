import { FaSearch } from "react-icons/fa";
import styles from "./Navbar.module.css";
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
    <div className={styles.navbar}>
      <div className={styles.search_section}>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <FaSearch />{" "}
          </button>
          <input
            type="text"
            placeholder="Procure por um filme..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
      </div>
      <Link to="/">
        M<BiCameraMovie />
        vieMax
      </Link>
    </div>
  );
};

export default Navbar;
