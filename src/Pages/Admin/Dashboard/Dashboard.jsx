import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Dashboard.module.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stock, setStock] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;


  //  CARREGAR ESTOQUE 
  const loadStock = () => {
    fetch(`${API_URL}/admin/stock`)
      .then(res => res.json())
      .then(data => setStock(data))
      .catch(err => console.error(err));
    Swal.fire("Estoque atualizado com sucesso")
  };

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      navigate("/admin");
      return;
    }
    loadStock();
  }, [navigate, API_URL]);

  //  AUMENTAR 
  const increase = async (id) => {
    const res = await fetch(
      `${API_URL}/admin/products/${id}/increase`,
      { method: "POST" }
    );
    const updated = await res.json();

    setStock(prev =>
      prev.map(p => p.id === id ? updated : p)
    );
  };

  //  DIMINUIR 
  const decrease = async (id) => {
    const res = await fetch(
      `${API_URL}/admin/products/${id}/decrease`,
      { method: "POST" }
    );
    const updated = await res.json();

    setStock(prev =>
      prev.map(p => p.id === id ? updated : p)
    );
  };

  //  DELETAR 
  const deleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/admin/products/${id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        Swal.fire(data.error || "Erro ao remover produto");
        return;
      }

      setStock(prev => prev.filter(p => p.id !== id));
      Swal.fire("Produto removido com sucesso!");
    } catch (err) {
      console.error(err);
      Swal.fire("Erro de conexão com o servidor");
    }
  };

  //  LOGOUT 
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
                className={`${styles.quantity} ${product.quantity === 0 ? styles.out : ""
                  }`}
              >
                Estoque: {product.quantity}
              </span>

              <div className={styles.actions}>
                <button onClick={() => increase(product.id)}>➕</button>
                <button onClick={() => decrease(product.id)}>➖</button>
                <button className={styles.logout} onClick={() => deleteProduct(product.id)}>Excluir</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footerActions}>
        <button
          className={styles.update}
          onClick={loadStock}
        >
          Atualizar estoque
        </button>

        <button
          className={styles.update}
          onClick={() => navigate("/admin/products")}
        >
          Cadastrar produto
        </button>

        <button className={styles.logout} onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
}
