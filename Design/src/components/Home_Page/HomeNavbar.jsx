import React from "react";
import "../../styles/HomeNavbar.css";
import LogoutComponent from "../../pages/Logout";
import Nav_link from "../navbar/nav-link";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  const isAuthenticated = localStorage.getItem("access_token"); // Updated check
  console.log("Is user authenticated:", isAuthenticated); // Debugging

  return (
    <header
      className="navbar-cont navbar-expand-lg fixed-top header-area header-sticky wow slideInDown"
      data-wow-duration="0.75s"
      data-wow-delay="0s"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="index.html" className="logo img-fluid">
                <img
                  src="assets/images/logo-tech.png"
                  className="img-fluid custom-logo"
                  alt="dnd"
                />
              </a>

              <ul className="nav">
                {/* Show Logout if user is logged in, otherwise show Login */}
                <li className="scroll-to-section">
                  {isAuthenticated ? (
                    <>
                      <li className="scroll-to-section">
                        <Nav_link
                          title="Dashboard"
                          link="/dashboard"
                          icon="bi-info-circle"
                        />
                      </li>
                      <LogoutComponent />
                    </>
                  ) : (
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  )}
                </li>
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
