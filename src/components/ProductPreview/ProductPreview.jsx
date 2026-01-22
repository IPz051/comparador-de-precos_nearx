import styles from "./style.module.css";

export default function ProductPreview({ product }) {
  const handleClick = () => {
    // se você quiser abrir ProductDetail:
    window.open(product.link, "_blank");
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={product.image} alt={product.name} />
      <div className={styles.overlay}>
        <span>{product.name}</span>
      </div>
      {product.price && <p className={styles.price}>{product.price}</p>}
    </div>
  );
}
