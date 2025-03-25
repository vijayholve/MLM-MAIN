import React from 'react';
import '../../styles/import '../styles/chain-app-dev.css'
'
const HomeNavbar = () => {
  return (
    <header className="navbar navbar-expand-lg fixed-top header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="index.html" className="logo img-fluid">
                <img src="assets/images/logo-tech.png" className="img-fluid custom-logo" alt="Chain App Dev" />
              </a>

              <ul className="nav">
                <li className="scroll-to-section"><a href="index.html" className="text-primary">Home</a></li>
                <li className="scroll-to-section"><a href="service.html">Services</a></li>
                <li className="scroll-to-section"><a href="support.html">Solution</a></li>
                <li className="scroll-to-section"><a href="about.html">About</a></li>
                <li className="scroll-to-section"><a href="contact.html">Contact us</a></li>
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeNavbar;
