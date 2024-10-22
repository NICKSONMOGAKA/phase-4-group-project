import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DisplayProductDetails = () => {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = () => {
      fetch(`https://phase-4-group-project-3.onrender.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setDetails(data));
    };
    fetchDetails();
  }, [id]);

  const handlePurchaseClick = () => {
    navigate("/purchase");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="ProductName">
      <div className="ProductDetails">
        <p>Title: {details.title}</p>
        <br />
        <p>Price: {details.price}</p><br/>
        <p>Description: {details.description}</p><br/>
        <p>Category: {details.category}</p><br/>
      </div>
      <div className="ProductImage">
        <img src={details.image_url} alt="product image"></img>
        <button className="green"onClick={handlePurchaseClick}>Go to purchase</button>
        <button className="red"onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default DisplayProductDetails;
