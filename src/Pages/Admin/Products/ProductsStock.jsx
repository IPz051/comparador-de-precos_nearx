import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./ProductsStock.module.css";

export default function ProductsStock() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    if (!name || !quantity) {
      Swal.fire("Preencha nome e quantidade");
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/admin/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          quantity,
          image
        })
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire(data.error || "Erro ao cadastrar produto");
        return;
      }

      Swal.fire("Produto cadastrado com sucesso!");
      
      setName("");
      setQuantity("");
      setImage("");

      navigate("/admin/dashboard");

    } catch (err) {
      console.error(err);
      Swal.fire("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Cadastro de Produto</h1>

        <input
          className={styles.input}
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={styles.input}
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Imagem (opcional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className={styles.button} onClick={handleSubmit}>
          Cadastrar produto
        </button>
      </div>
    </div>
  );
}
