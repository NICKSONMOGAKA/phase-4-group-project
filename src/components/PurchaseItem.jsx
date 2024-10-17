import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PurchaseItem = ({ id }) => {
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = () => {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error("Error fetching product details:", error));
    };
    fetchDetails();
  }, [id]);

  const handlePurchase = (e) => {
    e.preventDefault();
    
    navigate("/signup");
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="ProductDetails">
      <p>Product: {product.title}</p><br/>
      <img src={product.image} alt="product" />
      <p>Price: ${product.price}</p><br/>
      {message && <p>{message}</p>}
      <button className="green" onClick={handlePurchase}>Purchase</button>
      <button className="red"onClick={handleBack}>Back</button>
    </div>
  );
};

export default PurchaseItem