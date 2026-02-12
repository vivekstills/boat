import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to Our Boat Rental Service</h1>
        <nav className="app-nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <div className="mobile-menu">
        <button>Menu</button>
      </div>
      <section className="hero">
        <h2>Your Adventure Awaits</h2>
        <p>Explore the aquatic world with our premium boats.</p>
      </section>
      <footer className="app-footer">
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
        <p>&copy; 2026 Boat Rental Service. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
