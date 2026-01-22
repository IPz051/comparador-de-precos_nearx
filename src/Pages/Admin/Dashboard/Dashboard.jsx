import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Dashboard.module.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const initialStock = [
    { id: 1, name: "Notebook Gamer", quantity: 10, image: "/NotebookGamer.png" },
    { id: 2, name: "Console PS5", quantity: 5, image: "/consolePS5.png" },
    { id: 3, name: "Headset Gamer", quantity: 15, image: "/Headset.png" },
    { id: 4, name: "iPhone", quantity: 8, image: "/Iphone.png" },
  ];

  const loadInitialStock = () => {
    const savedStock = localStorage.getItem("stock");

    if (savedStock) {
      try {
        const parsed = JSON.parse(savedStock);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (error) {
        console.error("Erro ao carregar estoque:", error);
      }
    }

    return initialStock;
  };

  const [stock, setStock] = useState(loadInitialStock);
  const [originalStock, setOriginalStock] = useState(loadInitialStock);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      navigate("/admin");
    }
  }, [navigate]);

  const updateStock = (id, type) => {
    setStock((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "add"
                  ? item.quantity + 1
                  : Math.max(0, item.quantity - 1),
            }
          : item
      )
    );
  };

  const hasChanges = () =>
    JSON.stringify(stock) !== JSON.stringify(originalStock);

  const confirmUpdate = () => {
    if (!hasChanges()) {
      Swal.fire({
        icon: "info",
        title: "Nenhuma alteração ❗",
        text: "Você não fez nenhuma modificação no estoque.",
        confirmButtonColor: "#ffaa00",
      });
      return;
    }

    localStorage.setItem("stock", JSON.stringify(stock));
    setOriginalStock(stock);

    Swal.fire({
      icon: "success",
      title: "Estoque atualizado ✅",
      text: "As alterações foram salvas com sucesso.",
      confirmButtonColor: "#00ff7f",
    });
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("adminAuth");
    Swal.fire("Logout realizado 👋");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Controle de Estoque</h1>

      <div className={styles.grid}>
        {stock.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={product.image} alt={product.name} />
            </div>

            <div className={styles.info}>
              <h3 className={styles.productName}>{product.name}</h3>

              <span
                className={`${styles.quantity} ${
                  product.quantity === 0 ? styles.out : ""
                }`}
              >
                Estoque: {product.quantity}
              </span>

              <div className={styles.actions}>
                <button
                  className={styles.actionButton}
                  onClick={() => updateStock(product.id, "add")}
                >
                  ➕
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => updateStock(product.id, "remove")}
                >
                  ➖
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footerActions}>
        <button
          className={styles.update}
          onClick={confirmUpdate}
          disabled={!hasChanges()}
        >
          Atualizar Estoque
        </button>

        <button className={styles.logout} onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
}
