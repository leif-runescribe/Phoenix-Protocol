import React, { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { Wallet, LogOut } from "lucide-react";
import { formatAddress } from "../utils/utils";

const ConnectWalletButton: React.FC = () => {
  const { sdk, connected, account, connecting } = useSDK();
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [userAccount, setUserAccount] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (connected && account) {
      setWalletConnected(true);
      setUserAccount(account);
    } else {
      setWalletConnected(false);
      setUserAccount(undefined);
    }
  }, [connected, account]);

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts && accounts.length > 0) {
        setUserAccount(accounts[0]);
        setWalletConnected(true);
      }
    } catch (err) {
      console.error("Failed to connect wallet", err);
    }
  };

  const disconnect = async () => {
    try {
      await sdk?.terminate();
      setWalletConnected(false);
      setUserAccount(undefined);
    } catch (err) {
      console.error("Failed to disconnect wallet", err);
    }
  };

  return (
    <div className="relative">
      {walletConnected ? (
        <div className="flex items-center space-x-3">
          <button
            onClick={disconnect}
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            aria-label="Disconnect Wallet"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span>{formatAddress(userAccount)}</span>
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          disabled={connecting}
          className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Connect Wallet"
        >
          <Wallet className="w-5 h-5 mr-2" />
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;