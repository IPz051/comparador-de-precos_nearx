import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";
import Swal from "sweetalert2";

export function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query) return;
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));


  return (
    <header className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link to="/">
          <img src="/LogoPoupeJa-corrigida.png" alt="Logo PoupeJá" className={styles.logo} />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar produtos..."
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>🔍</button>
        {!loggedUser ? (
  <>
    <button className={styles.adminButton} onClick={() => navigate("/login")}>
      Login
    </button>

    <button className={styles.adminButton} onClick={() => navigate("/signup")}>
      Sign Up
    </button>
  </>
) : (
  <button
    className={styles.adminButton}
    onClick={() => {
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("userAuth");
      navigate("/");
      window.location.reload();
      Swal.fire ("Logout realizado !")
    }}
  >
    Sign Out
  </button>
)}


      </div>

    </header>
  );
}
export default Navbar;
