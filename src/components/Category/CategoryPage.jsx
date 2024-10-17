import React from "react";

import "./Category.css";
import ProductList from "../ProductList/ProductList";

function CategoryPage({displayDetails}) {
  return (
    <div>
      <div>
        <h1>Category</h1>
      </div>

      <div className="ProductList">
        <ProductList displayDetails={displayDetails}/>
      </div>
    </div>
  );
}

export default CategoryPage;
