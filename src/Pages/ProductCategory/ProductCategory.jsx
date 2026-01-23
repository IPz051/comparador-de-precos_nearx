import { useParams } from "react-router-dom";
import { productsCatalog } from "../../Mocks/Products";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import styles from './ProductCategory.module.css'
export default function ProductCategory() {
  const { category } = useParams();

  const filteredProducts = productsCatalog.filter(
    product => product.category === category
  );

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        Categoria: {category.toUpperCase()}
      </h1>

      <section className={styles.grid}>
        {filteredProducts.map(product => (
          <ProductPreview key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
