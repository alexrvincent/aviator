import React from 'react';
import Button from 'Components/Button';
import Logo from 'Assets/logo3.svg';
import Link from 'Components/Link';
import PlaceholderText from 'Components/PlaceholderText';

const NavBar: React.FC = () => {
  const linkProps = {
    'aria-label': 'Main Navigation Icon',
  };

  return (
    <header className="navbar">
      <div className="navbarLogo">
        {/* @ts-ignore */}
        <Link to="/" linkProps={linkProps}>
          <Logo alt="Main navigation icon" />
        </Link>
      </div>

      <nav className="navbarLinks">
        <PlaceholderText>
          {/* @ts-ignore */}
          <Link to="/another">{'Another Route'}</Link>
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
