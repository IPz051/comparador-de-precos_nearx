import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";

export function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query) return;
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

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
        <button className={styles.adminButton} onClick={() => navigate("/admin")}>Login</button>
      </div>

    </header>
  );
}
export default Navbar;
