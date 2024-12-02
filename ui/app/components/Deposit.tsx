import React, { useState, useEffect } from 'react';
import { 
  ArrowDownUp, Flame, Clock, TrendingDown, RefreshCw, 
  ArrowUpDown, CreditCard, BarChart, ShieldAlert 
} from 'lucide-react';

const PhoenixVaultDashboard = () => {
  const [depositAmount, setDepositAmount] = useState(1000);
  const [emberBorrowed, setEmberBorrowed] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [interestRate, setInterestRate] = useState(0.15);
  const [ltv, setLtv] = useState(0.75);
  const [liquidationThreshold, setLiquidationThreshold] = useState(0.85);

  // Calculations
  const borrowCapacity = depositAmount * ltv;
  const maxEmberBorrow = borrowCapacity;
  
  // Negative interest calculation
  const negativeInterestApplied = emberBorrowed * (interestRate * timeElapsed);
  const remainingDebt = emberBorrowed - negativeInterestApplied;
  
  // Liquidation risk
  const currentLeverageRatio = emberBorrowed / depositAmount;
  const isLiquidationRisk = currentLeverageRatio >= liquidationThreshold;

  // State reset function
  const resetState = () => {
    setDepositAmount(1000);
    setEmberBorrowed(0);
    setTimeElapsed(0);
  };

  return (
    <div className="min-h-screen min-w-[1200px] flex flex-col bg-black text-white p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Flame className="mr-3 text-white" />
          Phoenix Vault
        </h1>
        <div className="flex space-x-3">
          <button 
            onClick={resetState}
            className=" p-2 rounded-full transition"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Deposit & Borrow Controls */}
        <div className=" border  rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <CreditCard className="mr-3 text-white" />
            Vault Parameters
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-q00 mb-2">Deposit Amount (sUSD)</label>
              <input 
                type="number" 
                value={depositAmount}
                onChange={(e) => setDepositAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-emerald-900/50"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Loan-to-Value (LTV)</label>
              <input 
                type="number" 
                step="0.05"
                min="0"
                max="1"
                value={ltv}
                onChange={(e) => setLtv(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-emerald-900/50"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">EMBR Borrowed</label>
              <input 
                type="number" 
                value={emberBorrowed}
                max={maxEmberBorrow}
                onChange={(e) => setEmberBorrowed(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-emerald-900/50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Max Borrow: {maxEmberBorrow.toFixed(2)} EMBR
              </p>
            </div>
          </div>
        </div>

        {/* Time & Interest Controls */}
        <div className=" border  rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Clock className="mr-3 text-white" />
            Time & Interest
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Time Elapsed (Years)</label>
              <input 
                type="number" 
                step="0.25"
                value={timeElapsed}
                onChange={(e) => setTimeElapsed(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-emerald-900/50"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Negative Interest Rate</label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                max="1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-emerald-900/50"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Liquidation Threshold</label>
              <input 
                type="number" 
                step="0.05"
                min="0"
                max="1"
                value={liquidationThreshold}
                onChange={(e) => setLiquidationThreshold(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-emerald-900/50"
              />
            </div>
          </div>
        </div>

        {/* Vault Analytics */}
        <div className="border rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <BarChart className="mr-3 text-white" />
            Vault Analytics
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Borrow Capacity</span>
              <span className="font-medium white">
                {borrowCapacity.toFixed(2)} EMBR
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Initial Debt</span>
              <span className="font-medium">
                {emberBorrowed.toFixed(2)} EMBR
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Negative Interest Applied</span>
              <span className="font-medium text-white">
                {negativeInterestApplied.toFixed(2)} EMBR
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Remaining Debt</span>
              <span className="font-bold text-white">
                {remainingDebt.toFixed(2)} EMBR
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Leverage Ratio</span>
              <span className={`font-medium ${
                isLiquidationRisk ? 'text-red-500' : 'text-emerald-400'
              }`}>
                {(currentLeverageRatio * 100).toFixed(2)}%
              </span>
            </div>
            
            <div className="mt-2">
              {isLiquidationRisk ? (
                <div className="flex items-center text-red-500 bg-red-900/30 p-2 rounded-lg">
                  <ShieldAlert className="mr-2" size={20} />
                  Liquidation Risk Detected
                </div>
              ) : (
                <div className="text-emerald-500 bg-emerald-900/30 p-2 rounded-lg">
                  Vault in Good Standing
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoenixVaultDashboard;