import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Mainpage } from "./Pages/Mainpage";
import Products from "./Pages/Products/Products";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import AdminDashboard from "./Pages/Admin/Dashboard/Dashboard";
import ProductsStock from "./Pages/Admin/Products/ProductsStock";
import AdminLogin from "./Pages/Admin/Admin";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
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
        <Route path="/admin/products" element={<ProductsStock />} />
        <Route path="/signup" element ={<Signup />} />
        <Route path="/login" element ={<Login/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
