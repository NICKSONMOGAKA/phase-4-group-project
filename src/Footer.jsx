import React, { useState } from 'react';
import './Footer.css'; 

const Footer = () => {
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setComment(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <section className="footer-links">
          <h4><a href="#about">ShopEase</a></h4>
          <p>ShopEase is your go-to destination for a seamless online shopping experience. Discover top brands, exclusive deals, and much more.</p>
        </section>

        <section className="footer-address">
          <h4>Our Address</h4>
          <p>Ngong Lane Plaza,<br /> Moringa School,<br /> Room 101</p>
        </section>

        <section className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.linkedin.com/in/nicksonmogaka/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/nick_mokua/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </section>
        
        <section className="footer-app-links">
          <h4>Download Our App</h4>
          <div className="app-links">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" aria-label="Google Play Store">
              <i className="fab fa-google-play"></i>
            </a>
            <a href="https://apps.apple.com/app" target="_blank" rel="noopener noreferrer" aria-label="App Store">
              <i className="fab fa-app-store-ios"></i>
            </a>
          </div>
        </section>
        
        <section className="footer-comments">
          <h4>Leave a Comment</h4>
          {submitted ? (
            <p>Thank you for your comment!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <textarea
                value={comment}
                onChange={handleChange}
                placeholder="Your comment here"
                rows="4"
                required
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </section>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
