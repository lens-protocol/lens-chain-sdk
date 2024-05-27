/**
 * EIP-3085: Add Ethereum Chain support.
 *
 * @see https://eips.ethereum.org/EIPS/eip-3085
 */
export type AddEthereumChainParameter = {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
};
