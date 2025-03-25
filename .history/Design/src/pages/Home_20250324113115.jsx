import React from "react";
import HomeNavbar from "../components/Home_Page/HomeNavbar";
import Service from "../components/Home_Page/Service";

const Home = () => {
  return (
    <div className="">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold">Welcome to Our MLM Software</h1>
        <p className="mt-4 text-lg">
          Grow your business with our advanced multi-level marketing solutions.
        </p>
        <button className="mt-6 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
          Get Started
        </button>
      </section>

      {/* Services Section */}
      <Service />

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">User Management</h3>
            <p className="mt-2">Easily manage users and their downlines.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Commission Tracking</h3>
            <p className="mt-2">Track earnings and commissions in real-time.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Multi-Tier Payouts</h3>
            <p className="mt-2">Automate payments for different MLM levels.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="text-center py-12 bg-blue-500 text-white">
        <h2 className="text-3xl font-bold">Ready to Start?</h2>
        <p className="mt-2">
          Join us today and take your MLM business to the next level.
        </p>
        <button className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default Home;
