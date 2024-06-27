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
 * The Lens Development Network.
 */
export const staging: ChainDefinition = {
  id: 37111,
  name: 'Lens Development Network',
  network: 'lens-development-network',
  rpcUrl: 'https://rpc.staging.lens-network.crtlkey.com/',
  blockExplorerUrl: 'https://explorer.staging.lens.zksync.dev/',
  testnet: true,
  contracts: {
    erc20Factory: '0xCAb3353b6055d6FDE858f8b862B90c9f81f63Ec3',
    erc721Factory: '0xCfBDe041302aA0Fdee0dbAd4E22cc937fdC184ED',
  },
};

/**
 * Localhost using staging nodes.
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
