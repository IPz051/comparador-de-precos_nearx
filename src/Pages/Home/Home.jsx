import { useEffect, useState } from "react";
import { productsMock } from "../../Mocks/Products";
import { getPriceComparison } from "../../services/priceService";
import ProductList from "../../components/ProductList";
import MarketplaceCard from "../../components/MarketplaceCard";
import styles from "./Home.module.css";

export default function Home() {
  // ===== ESTADO DO ESTOQUE =====
  const [products, setProducts] = useState(productsMock);

  // ===== ESTADO DA COMPARAÇÃO =====
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prices, setPrices] = useState(null);
  const [loadingPrices, setLoadingPrices] = useState(false);

  // ===== ATUALIZAR ESTOQUE =====
  function updateStock(id, newStock) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, stock: newStock } : product
      )
    );
  }

  // ===== EXCLUIR PRODUTO =====
  function deleteProduct(id) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
      setPrices(null);
    }
  }

  // ===== BUSCAR PREÇOS =====
  useEffect(() => {
    if (!selectedProduct) return;

    async function loadPrices() {
      setLoadingPrices(true);
      setPrices(null);

      const result = await getPriceComparison(selectedProduct.name);

      setPrices(result);
      setLoadingPrices(false);
    }

    loadPrices();
  }, [selectedProduct]);

  return (
    <div className={styles.container}>
      <h1>NearX - Sistema de Estoque</h1>

      {/* LISTA DE PRODUTOS */}
      <ProductList
        products={products}
        onUpdateStock={updateStock}
        onDelete={deleteProduct}
        onCompare={setSelectedProduct}
      />

      {/* COMPARAÇÃO DE PREÇOS */}
      {selectedProduct && (
        <section className={styles.comparison}>
          <h2>Comparação de preços</h2>
          <h3>{selectedProduct.name}</h3>

          {loadingPrices && <p>Buscando preços...</p>}

          {!loadingPrices && prices && (
            <div className={styles.marketplaceList}>
              <div className={styles.marketplaceItem}>
                <MarketplaceCard
                  marketplace="Amazon"
                  price={prices.Amazon}
                />
              </div>

              <div className={styles.marketplaceItem}>
                <MarketplaceCard
                  marketplace="eBay"
                  price={prices.eBay}
                />
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
