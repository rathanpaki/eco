import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import Shop from "./pages/shop";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import ShoppingCart from "./pages/shoppingCart";
import WishList from "./pages/wishList";
import Checkout from "./pages/checkOut";
import AdminDashboard from "./pages/adminDashboard";
import Customization from "./pages/customization";
import AboutUs from "./pages/AboutUs"; 
import OrderDetailsModal from "./pages/orderDetailsModal";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <div>
        <ToastContainer /> {/* Add ToastContainer here */}
        {/* Cart Toggle Button (Hidden when cart is open) */}
        <button
          className={`cart-toggle-btn ${isCartOpen ? "hidden" : ""}`}
          onClick={() => setIsCartOpen(true)}
        >
          🛒
        </button>
        {/* Shopping Cart Overlay */}
        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/customize" element={<Customization />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/order-details" element={<OrderDetailsModal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
