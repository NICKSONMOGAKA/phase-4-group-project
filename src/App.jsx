import "./App.css";
import CategoryPage from "./components/Category/CategoryPage";
import React, { useState, useEffect } from "react";
import DisplayProductDetails from "./components/DisplayProductDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PurchaseItem from "./components/PurchaseItem";
import HomePage from "./HomePage";
import Footer from "./Footer";
import NavBar from "./components/NavBar";
import About from './components/About';
import Contact from './components/Contact';
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { Navigate } from 'react-router-dom';
import Signup from "./components/SignUp";

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { isAuthenticated, login, logout } = useAuth();

  const displayDetails = (id) => {
    setSelectedProductId(id);
  };

  const handleLogin = (token) => {
    login(token); 
  };

  const handleLogout = () => {
    logout(); 
  };

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<CategoryPage displayDetails={displayDetails} />} />
        <Route path="/product-details/:id" element={<DisplayProductDetails id={selectedProductId} />} />
        <Route
          path="/purchase"
          element={
            isAuthenticated ? (
              <PurchaseItem id={selectedProductId} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}