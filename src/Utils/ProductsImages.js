export const productImages = {
  notebook: "/NotebookGamer.png",
  console: "/consolePS5.png",
  headset: "/Headset.png",
  smartphone: "/Iphone.png",

  // fallback
  default: "/placeholder.png",
};

export function getProductImage(productName) {
  const name = productName.toLowerCase();

  if (name.includes("notebook") || name.includes("laptop"))
    return "notebook";

  if (name.includes("playstation") || name.includes("console"))
    return "console";

  if (name.includes("iphone") || name.includes("smartphone"))
    return "smartphone";

  if (name.includes("headset") || name.includes("fone"))
    return "headset";

  return "default";
}
