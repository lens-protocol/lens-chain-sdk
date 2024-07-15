export type DeployedContracts = {
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
  rpcUrl: 'https://sepolia.rpc.lens.dev',
  blockExplorerUrl: 'https://explorer.staging.lens.zksync.dev',
  testnet: true,
  contracts: {
    erc20Factory: '0x44D3f533C370C9Ed8cfbe2d77b4440DC74959508',
    erc721Factory: '0xCfBDe041302aA0Fdee0dbAd4E22cc937fdC184ED',
  },
};
