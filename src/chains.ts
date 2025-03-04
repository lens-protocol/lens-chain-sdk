export type DeployedContracts = {
  // well known
  multicall3: `0x${string}`;
};

export type ChainDefinition = {
  id: number;
  name: string;
  network: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  testnet: boolean;
  contracts: DeployedContracts;
};

/**
 * The Lens Chain Mainnet.
 */
export const mainnet: ChainDefinition = {
  id: 232,
  name: 'Lens Chain Mainnet',
  network: 'lens-chain-mainnet',
  rpcUrl: 'https://example.com',
  blockExplorerUrl: 'https://example.com',
  testnet: false,
  contracts: {
    multicall3: '0x000000000000000000000000000000000000dead',
  },
};

/**
 * The Lens Chain Sepolia Testnet.
 */
export const testnet: ChainDefinition = {
  id: 37111,
  name: 'Lens Chain Sepolia Testnet',
  network: 'lens-chain-testnet',
  rpcUrl: 'https://rpc.testnet.lens.dev',
  blockExplorerUrl: 'https://block-explorer.testnet.lens.dev/',
  testnet: true,
  contracts: {
    multicall3: '0x8A44EDE8a6843a997bC0Cc4659e4dB1Da8f91116',
  },
};
