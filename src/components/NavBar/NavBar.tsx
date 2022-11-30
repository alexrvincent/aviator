import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'Components/Button';
import Logo from './logo3.svg';
import PlaceholderText from 'Components/PlaceholderText';

const NavBar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbarLogo">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <nav className="navbarLinks">
        <PlaceholderText>
          <a href="#">How It Works</a>
        </PlaceholderText>

        <PlaceholderText>
          <a href="#">Pricing</a>
        </PlaceholderText>

        <PlaceholderText>
          <a href="#">Contact Us</a>
        </PlaceholderText>

        <div className="navbarButtons">
          <PlaceholderText>
            <Button className="btn-outline">Log In</Button>
          </PlaceholderText>
          <PlaceholderText>
            <Button className="btn-grad">Sign Up</Button>
          </PlaceholderText>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
