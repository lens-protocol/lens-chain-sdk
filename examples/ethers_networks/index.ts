import { getDefaultProvider, types } from '@lens-network/sdk/ethers';

const providers = [
  getDefaultProvider(types.Network.Staging),
  // getDefaultProvider(types.Network.Mainnet),
];

export default await Promise.all(
  providers.map(async (provider) => {
    const network = await provider.getNetwork();

    return [
      `<h2>${network.name}</h2>`,
      `<p>Chain Id: ${network.chainId}</p>`,
      `<p>Current Block Number: ${await provider.getBlockNumber()}</p>`,
    ].join('\n');
  }),
);
