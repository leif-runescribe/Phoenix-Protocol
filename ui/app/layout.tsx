'use client';

import React from 'react';
import "./globals.css";
import { MetaMaskProvider } from '@metamask/sdk-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sdkOptions = React.useMemo(() => ({
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: typeof window !== 'undefined' 
        ? `https://${window.location.host}` 
        : 'https://your-app-domain.com',
    },
  }), []);

  return (
    <html lang="en">
      <body>
      
        
        <MetaMaskProvider 
          debug={false} 
          sdkOptions={sdkOptions}
        >
          {children}
        </MetaMaskProvider>
      </body>
    </html>
  );
}