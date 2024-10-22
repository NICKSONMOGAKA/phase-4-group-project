import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

const ProductList = ({ displayDetails }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5500/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleItemClick = (id) => {
    displayDetails(id);
    navigate(`/product-details/${id}`);
  };

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        (category ? product.category === category : true) &&
        product.title.toLowerCase()
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div>
      <select value={category} onChange={handleCategoryChange}>
        {}
        {[...new Set(products.map((product) => product.category))].map(
          (cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          )
        )}
      </select>

      <ul className="product-list">
        {filteredAndSortedProducts.map((product) => (
          <li
            onClick={() => handleItemClick(product.id)}
            key={product.id}
            className="ItemList"
          >
            <img
              className="product-image"
              src={product.image}
              alt={product.title}
            />
            <p>{product.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
