'use client'
import React from "react";
import PixelTrail from "./components/PixelTrail";
import CreditCard from "./components/CreditCard";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Home: React.FC = () => {
  return (
    <div>
      
      <Navbar/>
    <div className="bg-darkGray text-white font-sans overflow-hidden">
      {/* Pixel Trail */}
      <PixelTrail />
      <Landing/>
      


      <CreditCard/>
      <Hero/>
      {/* Section with Overlapping Image */}
      <section className="relative bg-black py-20 px-6">
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-neonGreen opacity-10 rounded-full"></div>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6">Join the Revolution</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            Benefit from DeFi Innovations 
          </p>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="py-8 bg-darkGray text-center">
        <p className="text-gray-500">&copy; 2024 Phoenix. All rights reserved.</p>
      </footer>

    </div>
    

    </div>
  );
};

export default Home;
