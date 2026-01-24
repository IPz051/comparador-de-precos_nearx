// src/API/api.js
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts(query) {
  if (!query) return [];

  const response = await fetch(
    `${API_URL}/compare?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  const data = await response.json();
  return data.results || [];
}
