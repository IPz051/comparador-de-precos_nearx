import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const API_URL = import.meta.env.VITE_API_URL;


    if (!email || !password) {
      Swal.fire("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire(data.error || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("userAuth", "true");
      localStorage.setItem("loggedUser", JSON.stringify(data.user));

      Swal.fire("Login realizado com sucesso!");
      navigate("/");

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
          handleLogin();
        }}
      >
        <h1>Login</h1>

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
          Entrar
        </button>
      </form>
    </div>
  );
}
