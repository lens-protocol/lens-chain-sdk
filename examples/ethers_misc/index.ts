import { getDefaultProvider, types } from '@lens-network/sdk/ethers';

const provider = getDefaultProvider(types.Network.Localhost);

export default [
  `<h2>${(await provider.getNetwork()).name}</h2>`,
  `<p>Last Block Number: ${String(
    await provider.getBlockNumberByTime('before', Math.floor(Date.now() / 1000)),
  )}</p>`,
];
