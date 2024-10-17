import "./App.css";
import CategoryPage from "./components/Category/CategoryPage";
import React, { useState } from "react";
import DisplayProductDetails from "./components/DisplayProductDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PurchaseItem from "./components/PurchaseItem";
import HomePage from "./HomePage";
import Footer from "./Footer";
import NavBar from "./components/NavBar";
import About from './components/About';
import Contact from './components/Contact';
import InputForm from "./components/InputForm";

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const displayDetails = (id) => {
    setSelectedProductId(id);
  };
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/products"
          element={<CategoryPage displayDetails={displayDetails} />}
        />
        <Route
          path="/product-details/:id"
          element={<DisplayProductDetails id={selectedProductId} />}
        />
        <Route
          path="/purchase"
          element={<PurchaseItem id={selectedProductId} />}
        />
         <Route path="/signup" element={<InputForm />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
