import React from "react";
import HomeNavbar from "../components/Home_Page/HomeNavbar";
import Service from "../components/Home_Page/Service";
const Home = () => {
  return (
    <div className="container">
      <HomeNavbar />
      <Service />
      <h2>Home</h2>
    </div>
  );
};

export default Home;
