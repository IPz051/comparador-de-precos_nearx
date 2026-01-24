import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MarketplaceCard from "../../components/MarketplaceCard";
import styles from "./ProductDetail.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductDetail() {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const productsCatalog =
      JSON.parse(localStorage.getItem("productsCatalog")) || [];
    const product = productsCatalog.find((p) => p.id === Number(id));
    if (product) setProductName(product.name);
  }, [id]);

  const handleCompare = async () => {
    if (!productName) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/compare?query=${encodeURIComponent(productName)}`
      );
      const data = await response.json();
      setPrices(data.results?.slice(0, 20) || []);
    } catch (err) {
      console.error(err);
      setPrices([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{productName || "Produto"}</h1>

      <button
        className={styles.compareButton}
        onClick={handleCompare}
        disabled={loading}
      >
        {loading ? "Buscando preços..." : "Comparar preços"}
      </button>

      {loading && <p style={{ color: "#fff" }}>Carregando ofertas...</p>}

      {prices.length > 0 && (
        <div className={styles.marketplaceGrid}>
          {prices.map((item, idx) => (
            <MarketplaceCard
              key={idx}
              marketplace={item.marketplace}
              price={item.price}
              link={item.link}
              image={item.image}
            />
          ))}
        </div>
      )}

      {prices.length === 0 && !loading && (
        <p style={{ color: "#fff" }}>Nenhuma oferta encontrada.</p>
      )}
    </main>
  );
}
