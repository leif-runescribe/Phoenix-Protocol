'use client';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ConnectWalletButton from '../components/Connect';
import { MetaMaskProvider, useSDK } from '@metamask/sdk-react';
import Deposit from '../components/Deposit';

interface Vault {
  id: number;
  balance: string;
  borrowed: string;
}

interface ProtocolStats {
  totalSupply: number;
  totalDeposits: number;
  totalEmberBorrowed: number;
  totalActiveVaults: number;
}
const host = typeof window !== "undefined" ? window.location.host : "defaultHost";

const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: "Next-Metamask-Boilerplate",
    url: host,
  },
};

const Dashboard: React.FC = () => {
  const [userVaults, setUserVaults] = useState<Vault[]>([]);
  const [protocolStats, setProtocolStats] = useState<ProtocolStats>({
    totalSupply: 0,
    totalDeposits: 0,
    totalEmberBorrowed: 0,
    totalActiveVaults: 0,
  });
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const { sdk, connected, account, provider, chainId, connecting } = useSDK();
  useEffect(() => {
    if (connected && account) {
      setWalletConnected(true);
      console.log("sdkkkk:",sdk)
    } else {
      setWalletConnected(false);
    }
  }, [connected, account]);
 
  useEffect(() => {
    if (walletConnected && address) {
      console.log("wc sdkkkk:",sdk)
      console.log("fetchign : ",address )
      // Fetch user vaults and stats from your contract
      fetchUserVaults(address);
      fetchProtocolStats();
    }
  }, [walletConnected, address]);

  const fetchUserVaults = async (address: string) => {
    // Simulated data fetching (replace with actual Web3 calls)
    setUserVaults([
      { id: 1, balance: '1000 SUSDE', borrowed: '500 Ember' },
      { id: 2, balance: '2000 SUSDE', borrowed: '1500 Ember' },
    ]);
  };

  const fetchProtocolStats = async () => {
    // Simulated protocol stats (replace with actual contract interaction)
    setProtocolStats({
      totalSupply: 1000000,
      totalDeposits: 500000,
      totalEmberBorrowed: 200000,
      totalActiveVaults: 20,
    });
  };

  return (
   
    <div className="flex h-screen">
      <MetaMaskProvider 
          debug={false} 
          sdkOptions={sdkOptions}
        >
        <div className='absolute right-0 p-6'><MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton/>
        </MetaMaskProvider></div>
     <Sidebar />
      <Deposit/>
      </MetaMaskProvider>
    </div>
    
  );
};

export default Dashboard;
