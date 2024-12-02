import React, { useState } from "react";
import { motion } from "framer-motion";
import { Baby, BadgeDollarSign, CreditCard as CreditCardIcon, DollarSign, Flame, RefreshCw, ShieldCheck, Zap } from "lucide-react";

const PhoenixProtocolCard: React.FC = () => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const cardVariants = {
    hover: { 
      rotateY: 10,
      transition: { duration: 0.5 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-amber-700 via-slate-200 to-amber-700 p-4">
      <div className="text-center mb-8 max-w-2xl text-white">
        <h1 className="text-5xl font-bold mb-4 text-white">
          Self-Repaying Loans
        </h1>
        <p className="text-xl text-gray-100 mb-4">
          Revolutionizing DeFi with autonomous, self-sustaining financial instruments powered by cutting-edge blockchain technology.
        </p>
      </div>

      <motion.div 
        className="relative w-[450px] h-[270px] cursor-pointer"
        whileHover="hover"
        variants={cardVariants}
      >
        {/* Animated Card Outline (Trailing Silver) */}
        <motion.div 
          className="absolute inset-0 border-4 border-transparent rounded-3xl"
          animate={{
            
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        <motion.div 
          className="relative  w-full h-full bg-gradient-to-r from-amber-700 to-amber-600 rounded-3xl shadow-2xl overflow-hidden"
          style={{ 
            transformStyle: "preserve-3d",
            transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
          }}
        >
          {/* Front Side */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-600 to-black p-6 flex flex-col justify-between"
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)"
            }}
          >
            <div className="flex justify-between items-start">
              
              <div className="text-sm text-gray-900 flex  items-center space-x-1">
              <Flame size={32} className=" font-light" />
              <span className=""></span>
              </div>
            </div>

            <div>
              <div className="py-2 ml-28 pb-8 space-x-5 flex flex-row font-medium text-black"><span>sUSDe</span><BadgeDollarSign/><span>EMBR </span></div>
              
              <div className="text-gray-800 font-medium">Phoenix Vault ID</div>
              <div className="text-gray-900 text-2xl font-medium space-x-2 mb-4">
                <span className="tracking-wider text-sm">0xe00d2...D01A331</span>
              </div>
              
              <div className="flex justify-between text-white">
                <div>
                  <div className="font-medium text-sm text-gray-800">75% LTV</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-amber-200">sUSDe growth</div>
                  <div className="font-bold text-lg text-amber-500">15% APY</div>
                </div>
              </div>
            </div>
          </motion.div>

          
        </motion.div>
      </motion.div>

      <div className="  max-w-2xl py-12 text-center text-white">
        <p className="text-xl font-medium md:px-0 px-12 text-gray-900">
        <span className="text-black"></span>Phoenix leverages the power of the Ethena network.<br/> <span className="font-bold">Hold sUSDe tokens?</span><br/>-Get access to instant liquidity by locking up your <span className="font-extrabold">sUSDe in exchange for EMBR</span><br/>-Leverage sUSDe yield to autonomously cover your repayments<br/>-It's borrowing reinvented, with no strings attached.
        </p>
      </div>
    </div>
  );
};

export default PhoenixProtocolCard;
