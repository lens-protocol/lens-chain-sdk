import { getDefaultProvider, types } from '@lens-network/sdk/ethers';

const provider = getDefaultProvider(types.Network.Sepolia);

export default [
  [
    `<h2>${(await provider.getNetwork()).name}</h2>`,
    `<p>Chain Id: ${(await provider.getNetwork()).name}</p>`,
    `<p>Current Block Number: ${await provider.getBlockNumber()}</p>`,
  ].join('\n'),
];
