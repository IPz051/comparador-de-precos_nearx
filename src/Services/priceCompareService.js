export async function fetchProducts(query) {
  if (!query) return [];

  try {
    const res = await fetch(`http://localhost:3001/compare?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    return [];
  }
}

export async function getPriceComparison(productName) {
  if (!productName) return [];
  try {
    const res = await fetch(`http://localhost:3001/compare?query=${encodeURIComponent(productName)}`);
    if (!res.ok) throw new Error("Erro ao buscar preços");
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
