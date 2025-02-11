import "./App.css"; // Assuming you have a CSS file for styling
import { Link, NavLink } from "react-router-dom";
import Nav_link from "./nav-link";
import { Button } from "@chakra-ui/react";
import { UserContext } from "../../App";
import { useContext } from "react";
import { SiteConfig } from "../context/SiteConfingContent";
import LogoutComponent from "../../pages/Logout";

const Navbar = () => {
  const {siteConfigData} =useContext(SiteConfig)
  const { username } = useContext(UserContext);
  const { siteConfigData } = useContext(SiteConfig);

  return (
    <div>
      <header className="navbar sticky-top flex-md-nowrap">
        <div className="col-md-3 col-lg-3 me-0 px-3 fs-6">
          <a className="navbar-brand" href="/">
            <i className="bi bi-at me-1"></i>
            {siteConfigData.navbar_title} : {username}
          </a>
        </div>

        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <form
          className="custom-form header-form ms-lg-3 ms-md-3 me-lg-auto me-md-auto order-2 order-lg-0 order-md-0"
          action="#"
          method="get"
          role="form"
        >
          <input
            className="form-control"
            name="search"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </form>

        <div className="navbar-nav me-lg-2">
          <div className="nav-item text-nowrap d-flex align-items-center">
            <div className="dropdown ps-3">
              <a
                className="nav-link dropdown-toggle text-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi-bell"></i>
              </a>
              <ul className="dropdown-menu notifications-block-wrap bg-white shadow">
                <small>Notifications</small>
                <li className="notifications-block">
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="notifications-icon-wrap bg-success">
                      <i className="notifications-icon bi-check-circle-fill"></i>
                    </div>
                    <div>
                      <span>Your account has been created successfully.</span>
                      <p>12 days ago</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className="dropdown px-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="image.png"
                  className="profile-image img-fluid"
                  alt="Profile"
                />
              </a>
              <ul className="dropdown-menu bg-white shadow">
                <li>
                  <div className="dropdown-menu-profile-thumb d-flex">
                    <img
                      src="images/medium-shot-happy-man-smiling.jpg"
                      className="profile-image img-fluid me-3"
                      alt="Profile Thumbnail"
                    />
                    <div className="d-flex flex-column">
                      <small>{username}</small>
                      {/* <a href="#">thomas@site.com</a> */}
                    </div>
                  </div>
                </li>

                <li>
                  <a className="dropdown-item" href="/setting">
                    <i className="bi-gear me-2"></i>
                    Settings
                  </a>
                </li>
                <li className="border-top mt-3 pt-2 mx-4">
                  <LogoutComponent />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-3 d-md-block sidebar collapse"
          >
            <div className="position-sticky py-4 px-3 sidebar-sticky">
              <ul className="nav flex-column h-100">
                <li className="nav-item">
                  <Nav_link
                    title="Dashboard"
                    link="/dashboard"
                    icon="bi-info-circle"
                  />
                </li>
                <li className="nav-item">
                  <Nav_link title="Home" link="/" icon="bi-house" />
                </li>
                <li className="nav-item">
                  <Nav_link
                    title="Register Form"
                    link="/register-form"
                    icon="bi bi-r-circle"
                  />
                </li>
                <li className="nav-item">
                  {/* <NavLink
                    className={(e) =>
                      e.isActive ? "nav-link active" : "nav-link"
                    }
                    to="/mlm-tree"
                  >
                    <i className="bi-tree-fill me-2"></i>
                    MLM Tree
                  </NavLink> */}
                  {/* <Nav_link title={"MLM Tree"} link="/mlm-tree" icon="bi-tree" /> */}
                </li>
                <li className="nav-item">
                  <Nav_link
                    title={"MLM user"}
                    link="/all-users"
                    icon="bi bi-diagram-3"
                  />
                </li>
                <li className="nav-item">
                  <Nav_link
                    title={"Create Kyc"}
                    link={"/create-kyc"}
                    icon={"bi bi-check-circle"}
                  />
                </li>
                <li className="nav-item">
                  <Nav_link
                    title={"Kyc "}
                    link={"/kyc"}
                    icon={"bi bi-check-circle"}
                  />
                </li>
                <li className="nav-item">
                  <Nav_link
                    title={"Plans"}
                    link={"/plans"}
                    icon={"bi bi-bookmark-plus"}
                  />
                </li>
                <li className="nav-item">
                  <Nav_link
                    title={"Plans Create"}
                    link={"/create-plan"}
                    icon={"bi bi-bookmark-plus"}
                  />
                </li>
                <li className="nav-item border-top mt-auto pt-2">
                  <Nav_link
                    title={"setting"}
                    link={"/setting"}
                    icon={" bi bi-gear"}
                  />
                </li>

                <li className="nav-item pt-2">
                  <LogoutComponent />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
