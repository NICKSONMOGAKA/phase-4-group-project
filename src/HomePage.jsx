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
            <img src="https://media.istockphoto.com/id/1002544882/photo/a-white-computer-mouse-on-white-background-top-view-flat-lay-minimal-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=ItYKb4UBZjLHEVXzGDrcJ5h0hqCGlqnkqEcuwZBsUDA="alt='tech'/>
           </div>
          <div className="product">
            <img src="https://media.istockphoto.com/id/1246138278/photo/silver-metallic-white-wireless-headphones-in-the-air-isolated-on-white-background-music.webp?a=1&b=1&s=612x612&w=0&k=20&c=yaQ6l4WHU8cHGcfbybzI2z-k4OSnAj3WYjmbZrK1fcQ=" alt="headphones" />
          
          </div>
          <div className="product">
            <img src="https://media.istockphoto.com/id/1489867290/photo/many-tea-bags-in-wooden-box-and-leaves-on-light-green-background-closeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=VhL4FN-wFuTwtFQOz2KFlhpPl3K3MMijXTb9kr-FXIg=" alt="groceries" />
            
          </div>
        </div>
      </section>
      
    </>
  );
}

export default HomePage;
