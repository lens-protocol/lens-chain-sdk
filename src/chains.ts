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
  rpcUrl: 'https://rpc.staging.lens-network.crtlkey.com/',
  blockExplorerUrl: 'https://explorer.staging.lens.zksync.dev/',
  testnet: true,
  contracts: {
    erc20Factory: '0xCAb3353b6055d6FDE858f8b862B90c9f81f63Ec3',
    erc721Factory: '0xCfBDe041302aA0Fdee0dbAd4E22cc937fdC184ED',
  },
};

/**
 * Localhost using testnet nodes.
 */
export const localhost: ChainDefinition = {
  id: 37111,
  name: 'Lens Local Network',
  network: 'lens-local-network',
  rpcUrl: 'http://localhost:4096',
  blockExplorerUrl: 'https://explorer.staging.lens.zksync.dev/',
  testnet: true,
  contracts: {
    erc20Factory: '0xCAb3353b6055d6FDE858f8b862B90c9f81f63Ec3',
    erc721Factory: '0xCfBDe041302aA0Fdee0dbAd4E22cc937fdC184ED',
  },
};
