import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./signup.module.css";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    const API_URL = import.meta.env.VITE_API_URL;

    if (!name || !email || !password) {
      Swal.fire("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire(data.error || "Erro ao cadastrar");
        return;
      }

      Swal.fire("Conta criada com sucesso!");
      navigate("/login");

    } catch (err) {
      console.error(err);
      Swal.fire("Erro de conexão com o servidor");
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.card}
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <h1>Criar conta</h1>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Criar conta
        </button>
      </form>
    </div>
  );
}
