export type DeployedContracts = {
  // well known
  multicall3: `0x${string}`;
  WETH: `0x${string}`;
  WGRASS: `0x${string}`;

  // lens specific
  erc20Factory: `0x${string}`;
  erc721Factory: `0x${string}`;
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
 * The Lens Testnet Network.
 */
export const testnet: ChainDefinition = {
  id: 37111,
  name: 'Lens Testnet Network',
  network: 'lens-testnet-network',
  rpcUrl: 'https://rpc.testnet.lens.dev',
  blockExplorerUrl: 'https://block-explorer.testnet.lens.dev/',
  testnet: true,
  contracts: {
    multicall3: '0x8A44EDE8a6843a997bC0Cc4659e4dB1Da8f91116',
    erc20Factory: '0x44D3f533C370C9Ed8cfbe2d77b4440DC74959508',
    erc721Factory: '0x1299E25078d91f3aE5ff8A44DEbc7f25b2A1f314',
    WETH: '0xaA91D645D7a6C1aeaa5988e0547267B77d33fe16',
    WGRASS: '0x1CfDf7a1F0C2A4eAe5f3C3eA8e3eBd4f8F2fEe4A',
  },
};
