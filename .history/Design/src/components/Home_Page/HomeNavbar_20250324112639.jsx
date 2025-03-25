import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import LogoutComponent from "../../pages/Logout";
import Nav_link from "../navbar/nav-link";
import "../../styles/HomeNavbar.css";

const HomeNavbar = () => {
  const isAuthenticated = localStorage.getItem("access_token"); // Check auth status

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976D2" }}>
      <Toolbar>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img
              src="assets/images/logo-tech.png"
              alt="dnd"
              style={{ height: "40px", marginRight: "10px" }}
            />
            TechMLM
          </Typography>
        </Link>

        {/* Navigation Links */}
        {isAuthenticated ? (
          <>
            <Nav_link title="Dashboard" link="/dashboard" icon="bi-info-circle" />
            <LogoutComponent />
          </>
        ) : (
          <Button component={Link} to="/login" color="inherit" variant="outlined">
            Login
          </Button>
        )}

        {/* Mobile Menu Icon */}
        <IconButton edge="end" color="inherit" aria-label="menu" sx={{ display: { md: "none" } }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;
