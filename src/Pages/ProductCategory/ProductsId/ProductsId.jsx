import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Mainpage } from "./Pages/Mainpage";
import ProductCategory from "./Pages/ProductCategory";
import ProductDetail from "./Pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
