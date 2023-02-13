import React from 'react';
import Button from 'Components/Button';
import Logo from './logo3.svg';
import { Link, PlaceholderText } from 'Core/index';

const NavBar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbarLogo">
        {/* @ts-ignore */}
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <nav className="navbarLinks">
        <PlaceholderText>
          {/* @ts-ignore */}
          <Link to="/another-route">{'Another Route'}</Link>
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
