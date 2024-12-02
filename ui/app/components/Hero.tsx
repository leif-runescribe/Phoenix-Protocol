import React from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center bg-black overflow-hidden">
      {/* Wavy background with animation */}
      <motion.div
        className="absolute w-full h-full bg-gradient-to-b from-amber-700  to-black"
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
          1 EMBR = 1 USD
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-xl md:text-2xl font-semibold opacity-80 mt-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Put your sUSDe to work and get instant loans
        </motion.p>

        {/* Button */}
        <motion.a
          href="#"
          className="inline-block mt-6 px-8 py-4 bg-transparent border-2  transition-all duration-300 hover:bg-white hover:text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div className="text-xl hidden md:flex flex-row gap-2 font-medium text-white cursor-pointer">
            <span >
              <Image src="/b.png" alt="Pay Icon" width={80} height={40} />
            </span>
          </div>
        </motion.a>
        <div 
            className="mt-16 py-20 rounded-3xl inset-0 p-6 flex flex-col justify-center text-center"
            
          >
            <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Self-Funding Mechanism
            </h3>
            <div className="space-y-3 text-white">
              <div className="flex items-center justify-center space-x-2">
                <RefreshCw size={20} className="text-white" />
                <span>Powered by Ethena Network Rewards</span>
              </div>
              <div className="text-2xl text-gray-100">
                Loans automatically repay through staking rewards 
              </div>
              <div className="text-2xl text-amber-300">
                Sustainable DeFi • Web3 • Autonomous Finance
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Hero;
