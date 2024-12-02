'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Croissant, X } from "lucide-react"; // For the hamburger menu icon and close icon
import Link from "next/link"; // Import the Link component from Next.js
import Image from "next/image";
import { MetaMaskProvider } from "@metamask/sdk-react";
import ConnectWalletButton from "./Connect";

const Navbar = () => {
  const host = typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host,
    },
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative">
      {/* Main Navbar with Glassy Blur Effect */}
      <motion.nav
        className="fixed lg:w-[1000px] gap-20 top-5 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-10 backdrop-blur-lg rounded-full px-16 flex justify-between items-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Logo */}
        <Link href="/">
          <div className="text-xl hidden md:flex flex-row gap-2 font-medium text-white cursor-pointer">
            <span >
              <Image src="/a.png" alt="Pay Icon" width={80} height={40} />
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-16 text-center items-center text-white">
          <Link href="/app">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer transition-all"
            >
              App
            </motion.div>
          </Link>
          <Link href="/about">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer transition-all"
            >
              About
            </motion.div>
          </Link>
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton/>
        </MetaMaskProvider>
          
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden text-white cursor-pointer" onClick={toggleSidebar}>
          <Image src="/a.png" alt="Pay Icon" width={80} height={40} />
        </div>
      </motion.nav>

      {/* Sidebar for Mobile */}
      <motion.div
        className={`fixed top-0 right-0 h-full w-full text-center flex flex-col bg-black bg-opacity-50 backdrop-blur-lg p-6 space-y-8 z-30 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 ease-in-out`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isSidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between text-center items-center">
          <div className="text-xl font-bold text-green-400">TytanPay</div>
          <div onClick={toggleSidebar}>
            <X size={30} className="text-white cursor-pointer" />
          </div>
        </div>
        <div className="space-y-6 flex flex-col text-center items-center text-white text-lg">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer transition-all"
            >
              Home
            </motion.div>
          </Link>
          <Link href="/about">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer transition-all"
            >
              About
            </motion.div>
          </Link>
          <Link href="/contact">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer transition-all"
            >
              Contact
            </motion.div>
          </Link>
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton/>
        </MetaMaskProvider>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
