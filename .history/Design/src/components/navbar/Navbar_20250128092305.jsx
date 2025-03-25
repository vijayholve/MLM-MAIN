import "./App.css"; // Assuming you have a CSS file for styling
import { Link, NavLink } from "react-router-dom";
import Nav_link from "./nav-link";
import { Button } from "@chakra-ui/react";
import { UserContext } from "../../App";
import { useContext } from "react";
import { SiteConfig } from "../context/SiteConfingContent";
import LogoutComponent from "../../pages/Logout";
import NavHeader from "./NavHeader";
const Navbar = () => {
  const {siteConfigData} =useContext(SiteConfig)
  const { username } = useContext(UserContext);

  return (
    <div>
     <NavHeader/>

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
