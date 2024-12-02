export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
    return balance;
  };
  
  export const formatChainAsNum = (chainIdHex: string) => {
    const chainIdNum = parseInt(chainIdHex);
    return chainIdNum;
  };
  
  export const formatAddress = (addr: string | undefined) => {
    if (!addr) return ''; // Handle the case where addr is undefined or null
    const first3 = addr.substring(0, 3); // Get the first 3 characters
    const last3 = addr.substring(addr.length - 3); // Get the last 3 characters
    return `${first3}...${last3}`; // Combine them with ellipsis in between
  };
  