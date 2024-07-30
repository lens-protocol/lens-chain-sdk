export type DeployedContracts = {
  tokenFactory: `0x${string}`;
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
    tokenFactory: '0x48b6F39517153ed96C152335dCBfA5CF8FC492A2',
  },
};
