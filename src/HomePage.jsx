import React from 'react';
import './HomePage.css'; 
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <header className="header">
        <h1>Welcome to ShopEase</h1>
        
      </header>
        
      <section className="hero">
     <div className='shopping'>
      <img src="https://img.freepik.com/premium-photo/black-friday-banner-with-dark-theme-neon-accents-urging-urgency-shopping_653240-3194.jpg"alt='tech'/>
           </div>
       </section>
      <section className="products">
        <h3 className='nav-link'>New Items on Sale 25% discount </h3>
        <div className="product-list">
        <div className='product'>
            <img src="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"alt='tech'/>
           </div>
          <div className="product">
            <img src="https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg" alt="cloth 1" />
          
          </div>
          <div className="product">
            <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="laptop 1" />
            
          </div>
        </div>
      </section>
      
    </>
  );
}

export default HomePage;
