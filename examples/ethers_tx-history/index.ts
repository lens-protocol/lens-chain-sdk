import '@lens-network/sdk/ethers/globals';
import { getDefaultProvider, types } from '@lens-network/sdk/ethers';
import { ZeroAddress } from 'ethers/constants';

const chain = types.Network.Staging;

const provider = getDefaultProvider(chain);

const { items } = await provider.getTxHistory({
  address: window.prompt('Enter an address', '') ?? ZeroAddress,
  pageInfo: { page: 1, limit: 10, sort: 'asc' },
});

export default [`<h2>Tx History</h2>`, ...items.map((tx) => `<p>Hash: ${tx.hash}</p>`)];
