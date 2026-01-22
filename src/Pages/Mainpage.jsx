import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "./main.module.css";
import Navbar from "../components/Header/Header";
import 'animate.css';

const MySwal = withReactContent(Swal);

export function Mainpage() {
  const navigate = useNavigate();
  const [query] = useState("");

  useEffect(() => {
    localStorage.removeItem("firstVisit"); // Remover esta linha após os testes
    const firstVisit = localStorage.getItem("firstVisit");

    if (!firstVisit) {
      MySwal.fire({
        title: "✨ Seja bem-vindo(a) ✨",
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; gap:1rem;">
            <img src="/LogoPoupeJa-corrigida.png" alt="Logo" 
            style="width:400px; height:auto;" />
            <p style="font-size:1.5rem; color:#00ff7f; font-weight:600; text-align:center; max-width:350px;">
              Estamos felizes em tê-lo(a) aqui! Explore nosso comparador de preços e encontre as melhores ofertas para você.
            </p>
          </div>
        `,
        background: "rgba(92, 92, 92, 0.5)",
        color: "#fff",
        showConfirmButton: true,
        confirmButtonText: "Vamos lá! 🚀",
        confirmButtonColor: "#00ff808e",
        width: 450,
        padding: "2rem",
        backdrop: `
          rgba(0,0,0,0.8)
          url("/sparkles.gif")
          left top
          no-repeat
        `,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
          backdrop: 'animate__animated animate__fadeIn'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
          backdrop: 'animate__animated animate__fadeOut'
        }
      });

      localStorage.setItem("firstVisit", "true");
    }
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>Encontre o melhor preço para seus produtos</h1>
              <p>
                Compare preços de produtos de tecnologia em tempo real e economize tempo e dinheiro
                com nosso comparador de preços fácil de usar. 
                <span className={styles.spanPhrase}>
                 Pesquise ou clique nos itens ao lado.
                </span>
              </p>

              <button className={styles.compareButton} onClick={handleSearch}>
                PoupeJá!
              </button>
            </div>

            <div className={styles.heroCards}>
              <Link to="/products?search=notebook gamer" className={styles.productCard}>
                <img src="/NotebookGamer.png" alt="Notebook" />
                <div className={styles.productOverlay}>
                  <span>Notebook Gamer</span>
                </div>
              </Link>

              <Link to="/products?search=console" className={styles.productCard}>
                <img src="/consolePS5.png" alt="Console" />
                <div className={styles.productOverlay}>
                  <span>Console</span>
                </div>
              </Link>

              <Link to="/products?search=headset" className={styles.productCard}>
                <img src="/Headset.png" alt="Headset" />
                <div className={styles.productOverlay}>
                  <span>Headset</span>
                </div>
              </Link>

              <Link to="/products?search=iphone" className={styles.productCard}>
                <img src="/Iphone.png" alt="Smartphone" />
                <div className={styles.productOverlay}>
                  <span>Iphone</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
