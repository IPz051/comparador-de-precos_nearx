import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Admin.module.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const ADMIN_PASSWORD = "admin123";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");

      Swal.fire({
        icon: "success",
        title: "Acesso autorizado 🔐",
        confirmButtonColor: "#00ff7f",
      });

      navigate("/admin/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Senha incorreta ❌",
        text: "Acesso restrito ao administrador",
        confirmButtonColor: "#ff4d4d",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1>🔒 Área Administrativa</h1>

      <input
        type="password"
        placeholder="Senha do admin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      <button onClick={handleLogin} className={styles.button}>
        Entrar
      </button>
    </div>
  );
}

