import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'Components/Button';
import Logo from './logo3.svg';

const NavBar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbarLogo">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <nav className="navbarLinks">
        <a href="#">How It Works</a>
        <a href="#">Pricing</a>
        <a href="#">Contact Us</a>
        <div className="navbarButtons">
          <Button className="btn-outline"> Log In </Button>
          <Button className="btn-grad"> Sign Up </Button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
