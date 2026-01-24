import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Products.module.css";
import Navbar from "../../components/Header/Header";

const API_URL = import.meta.env.VITE_API_URL;

export default function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    async function loadProducts() {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/compare?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setProducts(data.results?.slice(0, 20) || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [query]);

  return (
    <main className={styles.container}>
      <Navbar />

      <h1 className={styles.title}>Resultados para: "{query}"</h1>

      {loading && <p className={styles.title}>Carregando produtos...</p>}
      {products.length === 0 && !loading && (
        <p className={styles.title}>Nenhum produto encontrado.</p>
      )}

      <section className={styles.grid}>
        {products.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={item.image || "/placeholder.png"}
                alt={item.title}
                className={styles.productImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.productTitle}>
                {item.title.length > 40
                  ? item.title.slice(0, 37) + "..."
                  : item.title}
              </h3>
              {item.price && (
                <p className={styles.productPrice}>{item.price}</p>
              )}
              <button
                className={styles.viewButton}
                onClick={() => window.open(item.link, "_blank")}
              >
                Ver Oferta
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
