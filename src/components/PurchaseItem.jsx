import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PurchaseItem = ({ id }) => {
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchDetails = () => {
        fetch(`https://phase-4-group-project-3.onrender.com/products/${id}`)  
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Error fetching product details:", error));
    };
    fetchDetails();
  }, [id]);

  const handlePurchase = () => {
    fetch("https://phase-4-group-project-3.onrender.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ product_ids: [id] }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage("Purchase successful! Thank you for shopping with us.");
      })
      .catch(() => setMessage("Failed to complete the purchase. Please try again."));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="ProductDetails">
      <div className="ProductDetails">
        <p>Title: {product.title}</p>
        <br />
        <p>Price: {product.price}</p><br/>
        <p>Description: {product.description}</p><br/>
        <p>Category: {product.category}</p><br/>
        <img src={product.image_url} alt="product image"></img>
      </div>
      <button className="green" onClick={handlePurchase}>Purchase</button>
      {message && <p>{message}</p>}
      <button className="red" onClick={handleBack}>Back</button>
    </div>
  );
};

export default PurchaseItem;

