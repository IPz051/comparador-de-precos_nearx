import { useEffect, useState } from "react";
import { productsMock } from "../../Mocks/Products";
import ProductList from "../../components/ProductList";
import MarketplaceCard from "../../components/MarketplaceCard";
import styles from "./home.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [products, setProducts] = useState(productsMock);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prices, setPrices] = useState(null);
  const [loadingPrices, setLoadingPrices] = useState(false);

  function updateStock(id, newStock) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, stock: newStock } : product
      )
    );
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
      setPrices(null);
    }
  }

  useEffect(() => {
    if (!selectedProduct) return;

    async function loadPrices() {
      setLoadingPrices(true);
      setPrices(null);

      try {
        const response = await fetch(
          `${API_URL}/compare?query=${encodeURIComponent(selectedProduct.name)}`
        );
        const data = await response.json();
        setPrices(data);
      } catch (err) {
        console.error(err);
        setPrices(null);
      } finally {
        setLoadingPrices(false);
      }
    }

    loadPrices();
  }, [selectedProduct]);

  return (
    <div className={styles.container}>
      <h1>NearX - Sistema de Estoque</h1>

      <ProductList
        products={products}
        onUpdateStock={updateStock}
        onDelete={deleteProduct}
        onCompare={setSelectedProduct}
      />

      {selectedProduct && (
        <section className={styles.comparison}>
          <h2>Comparação de preços</h2>
          <h3>{selectedProduct.name}</h3>

          {loadingPrices && <p>Buscando preços...</p>}

          {!loadingPrices && prices && (
            <div className={styles.marketplaceList}>
              <div className={styles.marketplaceItem}>
                <MarketplaceCard marketplace="Amazon" price={prices.Amazon} />
              </div>

              <div className={styles.marketplaceItem}>
                <MarketplaceCard marketplace="eBay" price={prices.eBay} />
              </div>

              <div className={styles.marketplaceItem}>
                <MarketplaceCard
                  marketplace="Walmart"
                  price={prices.Walmart}
                />
              </div>
            </div>
          )}

          <button
            className={styles.closeButton}
            onClick={() => {
              setSelectedProduct(null);
              setPrices(null);
            }}
          >
            Fechar comparação
          </button>
        </section>
      )}
    </div>
  );
}
