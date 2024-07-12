// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Forest Hill vous souhaite la bienvenue</h2>
      <div className="buttons">
        <Link to="/login">
          <button className="home-button">Connexion</button>
        </Link>
        <Link to="/register">
          <button className="home-button">Création de compte</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
