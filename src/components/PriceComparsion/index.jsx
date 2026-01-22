import { useEffect, useState } from "react";
import { getPriceComparison } from "../../Services/PriceService";
import styles from "./style.module.css";

export default function PriceComparison({ productName }) {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productName) return;

    async function loadPrices() {
      setLoading(true);
      const data = await getPriceComparison(productName);
      setPrices(data);
      setLoading(false);
    }

    loadPrices();
  }, [productName]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Comparação de preços</h2>

      {loading && <p>Carregando preços...</p>}

      {!loading && prices && (
        <div className={styles.cards}>
          <div>
            <strong>Amazon</strong>
            <p>R$ {prices.Amazon.toFixed(2)}</p>
          </div>

          <div>
            <strong>eBay</strong>
            <p>R$ {prices.eBay.toFixed(2)}</p>
          </div>

          <div>
            <strong>Walmart</strong>
            <p>R$ {prices.Walmart.toFixed(2)}</p>
          </div>
        </div>
      )}
    </section>
  );
}
