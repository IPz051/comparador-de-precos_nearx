import styles from "./style.module.css";

export default function MarketplaceCard({ marketplace, price, link, image }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={image || "/placeholder.png"}
          alt={marketplace}
          className={styles.marketImage}
        />
      </div>
      <h3>{marketplace}</h3>
      {price && <p className={styles.price}>{price}</p>}
      <button className={styles.button}>Ver oferta</button>
    </a>
  );
}
