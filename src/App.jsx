import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Mainpage } from "./Pages/Mainpage";
import Products from "./Pages/Products/Products";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import AdminDashboard from "./Pages/Admin/Dashboard/Dashboard";
import AdminLogin from "./Pages/Admin/Admin";
import 'animate.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
