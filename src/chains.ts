export type DeployedContracts = {
  // well known
  multicall3: `0x${string}`;
  wrappedGasToken: `0x${string}`;
};

/**
 * @internal
 */
export type NativeCurrency = {
  name: string;
  symbol: string;
  decimals: 18;
};

/**
 * @internal
 */
export type ChainDefinition = {
  id: number;
  name: string;
  network: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  testnet: boolean;
  contracts: DeployedContracts;
  nativeCurrency: NativeCurrency;
};

/**
 * The Lens Chain Mainnet.
 * @internal
 */
export const mainnet: ChainDefinition = {
  id: 232,
  name: 'Lens Chain Mainnet',
  network: 'lens-chain-mainnet',
  rpcUrl: 'https://rpc.lens.xyz',
  blockExplorerUrl: 'https://explorer.lens.xyz/',
  testnet: false,
  contracts: {
    multicall3: '0x6b6dEa4D80e3077D076733A04c48F63c3BA49320',
    wrappedGasToken: '0x6bdc36e20d267ff0dd6097799f82e78907105e2f',
  },
  nativeCurrency: {
    name: 'GHO Token',
    symbol: 'GHO',
    decimals: 18,
  },
};

/**
 * The Lens Chain Testnet.
 * @internal
 */
export const testnet: ChainDefinition = {
  id: 37111,
  name: 'Lens Chain Testnet',
  network: 'lens-chain-testnet',
  rpcUrl: 'https://rpc.testnet.lens.xyz',
  blockExplorerUrl: 'https://explorer.testnet.lens.xyz/',
  testnet: true,
  contracts: {
    multicall3: '0xeee5a340Cdc9c179Db25dea45AcfD5FE8d4d3eB8',
    wrappedGasToken: '0xeee5a340Cdc9c179Db25dea45AcfD5FE8d4d3eB8',
  },
  nativeCurrency: {
    name: 'Grass Token',
    symbol: 'GRASS',
    decimals: 18,
  },
};
