export type ChainDefinition = {
  id: number;
  name: string;
  network: string;
  rpcUrl: string;
  blockExplorerUrl: string;
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
};
