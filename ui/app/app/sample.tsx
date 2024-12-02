'use client'
import React, { useState } from 'react';
import { Award, Zap, CreditCard, BarChart2 } from 'lucide-react';
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';

export default function SelfRepayingLoanDashboard() {
  const [depositAmount, setDepositAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');

  // Mock calculation functions (replace with actual contract logic)
  const calculateEmberTokens = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * 0.95).toFixed(2);
  };

  const calculateLoanDetails = (amount: string) => ({
    totalDebt: parseFloat(amount) * 1.1,
    yearsToRepay: 3,
    monthlyRewards: (parseFloat(amount) * 0.015).toFixed(2)
  });

  const loanDetails = loanAmount ? calculateLoanDetails(loanAmount) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-amber-700 text-white">
        
      <div className="container mx-auto px-4 py-8">
        <Navbar/>
        {/* Header */}
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          
        <header className="mb-12 mt-40 text-center">
          
        </header>
        </motion.h1>

        {/* Main Dashboard Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Deposit & Loan Section */}
          <div className="bg-black/40 rounded-2xl p-6 border border-green-800/50">
            <div className="space-y-6">
              {/* sUSDe Deposit */}
              <div>
                <label className="block text-green-300 mb-2 flex items-center">
                  <Zap className="mr-2 text-amber-500" />
                  Deposit sUSDe
                </label>
                <div className="flex">
                  <input 
                    type="number" 
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Enter sUSDe amount"
                    className="w-full p-3 bg-black/30 border border-green-700 rounded-l-lg text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="bg-green-600 px-4 rounded-r-lg hover:bg-green-700 transition">
                    Deposit
                  </button>
                </div>
                {depositAmount && (
                  <p className="text-sm text-green-400 mt-2">
                    Expected Ember Tokens: {calculateEmberTokens(depositAmount)}
                  </p>
                )}
              </div>

              {/* Loan Creation */}
              <div>
                <label className="block text-green-300 mb-2 flex items-center">
                  <CreditCard className="mr-2 text-green-500" />
                  Create Loan
                </label>
                <div className="flex">
                  <input 
                    type="number" 
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter loan amount"
                    className="w-full p-3 bg-black/30 border border-green-700 rounded-l-lg text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="bg-green-600 px-4 rounded-r-lg hover:bg-green-700 transition">
                    Create Loan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Loan Details & Dashboard */}
          <div className="space-y-6">
            {loanDetails && (
              <div className="bg-black/40 rounded-2xl p-6 border border-green-800/50">
                <h2 className="text-2xl font-semibold text-green-300 mb-4 flex items-center">
                  <BarChart2 className="mr-2 text-green-500" />
                  Loan Projection
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-400">Total Debt</span>
                    <span className="font-bold text-green-200">${loanDetails.totalDebt.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-400">Monthly Rewards</span>
                    <span className="font-bold text-green-200">${loanDetails.monthlyRewards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-400">Years to Repay</span>
                    <span className="font-bold text-green-200">{loanDetails.yearsToRepay} years</span>
                  </div>
                </div>
              </div>
            )}

            {/* Future Exchanges */}
            <div className="bg-black/40 rounded-2xl p-6 border border-green-800/50">
              <h2 className="text-2xl font-semibold text-green-300 mb-4 flex items-center">
                <Award className="mr-2 text-green-500" />
                Future Exchanges
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {['USDC', 'USDT', 'DAI'].map(token => (
                  <div 
                    key={token} 
                    className="bg-green-800/30 p-3 rounded-lg text-center hover:bg-green-800/50 transition"
                  >
                    {token}
                  </div>
                ))}
              </div>
              <p className="text-sm text-green-400 mt-2">
                Exchange your Ember tokens across multiple stablecoins
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

