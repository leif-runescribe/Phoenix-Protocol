import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center bg-black overflow-hidden">
      {/* Wavy background with animation */}
      <motion.div
        className="absolute w-full h-full bg-gradient-to-b from-black  to-amber-700"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <div className="relative z-10 text-center text-white px-6">
        {/* Main Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <p className="fire-text animate-flicker">Phoenix</p>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-xl md:text-2xl font-semibold opacity-80 mt-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Self repaying Loans<br/>
          Powered by sUSDe
          </motion.p>
          
        {/* Button */}
        <Link href="/app"><motion.div
          className="inline-block mt-6 px-8 py-4 bg-transparent border-2 border-white rounded-full text-white text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          Get Started
        </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
