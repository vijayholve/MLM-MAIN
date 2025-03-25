import React from 'react';
import '../../styles/chain-app-dev.css'

const HomeNavbar = () => {
    return (
        <header className="custom-navbar shadow-md fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-6 lg:px-20 flex items-center justify-between h-20">
            {/* Logo */}
            <div className="logo">
              <a href="/" className="text-2xl font-bold text-blue-500">
                MyLogo
              </a>
            </div>
    
            {/* Navigation Links */}
            <nav className="main-nav">
              <ul className="flex items-center space-x-8 text-gray-600">
                <li>
                  <a
                    href="#home"
                    className="hover:text-blue-500 transition-colors duration-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-blue-500 transition-colors duration-200"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-blue-500 transition-colors duration-200"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-blue-500 transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
    
            {/* Call-to-Action */}
            <div>
              <a
                href="#get-started"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-200"
              >
                Get Started
              </a>
            </div>
          </div>
        </header>
      );
    };

export default HomeNavbar;
