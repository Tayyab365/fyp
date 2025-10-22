import React, { useLayoutEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import DashboardLayout from "./Layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Products from "./pages/dashboard/Product/Products";
import Orders from "./pages/dashboard/Order/Orders";
import Users from "./pages/dashboard/User/Users";
import AddProduct from "./pages/dashboard/Product/AddProduct";
import EditProduct from "./pages/dashboard/Product/EditProduct";
import AuthLayout from "./Layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ChatbotButton from "./components/Chatbot/ChatbotButton";
import ChatWindow from "./components/Chatbot/ChatWindow";
import NotFound from "./pages/NotFound";
import MainLayout from "./Layouts/MainLayout";
import Profile from "./pages/Profile";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/cart"
            element={
              <>
                <Cart />
              </>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRole="Admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product" element={<EditProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="center-center" reverseOrder={false} />

      <ChatbotButton onToggle={toggleChat} isOpen={isChatOpen} />
      {isChatOpen && <ChatWindow onClose={toggleChat} />}
    </BrowserRouter>
  );
};

export default App;
