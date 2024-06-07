import { expect, describe, it } from 'vitest';

import { getDefaultProvider, types } from '.';
import { Provider } from './providers';

describe(`Given an ethers.js Provider instance`, () => {
  describe(`When calling "${Provider.prototype.getBlockNumberByTime.name}" method`, () => {
    it('Then it should return the closest block number', async () => {
      const provider = getDefaultProvider(types.Network.Staging);

      const result = await provider.getBlockNumberByTime('before', Math.floor(Date.now() / 1000));

      expect(result).toEqual(expect.hexString());
    });
  });

  describe(`When calling "${Provider.prototype.getContractCreation.name}"`, () => {
    const provider = getDefaultProvider(types.Network.Staging);

    it('Then it should return the relevant contract creation information', async () => {
      const [details] = await provider.getContractCreation([
        '0x175a469603aa24ee4ef1f9b0b609e3f0988668b1',
      ]);

      expect(details).toMatchObject({
        contractAddress: expect.evmAddress(),
        contractCreator: expect.evmAddress(),
        txHash: expect.hexString(),
      });
    });

    it('The it should return an empty array if no contract creation information is found', async () => {
      const result = await provider.getContractCreation([
        '0x0000000000000000000000000000000000000000',
      ]);

      expect(result).toEqual([]);
    });
  });

  describe(`When calling "${Provider.prototype.getTokenInfo.name}"`, () => {
    it('Then it should return the given token info', async () => {
      const provider = getDefaultProvider(types.Network.Localhost);

      const result = await provider.getTokenInfo('0x175a469603aa24ee4ef1f9b0b609e3f0988668b1');

      expect(result).toMatchObject({
        contractAddress: expect.evmAddress('0x175a469603aa24ee4ef1f9b0b609e3f0988668b1'),
        iconURL: '',
        l1Address: '',
        liquidity: '',
        symbol: 'MTK',
        tokenDecimal: '18',
        tokenName: 'TestErc20Token',
        tokenPriceUSD: '',
      });
    });

    it('Then it should return null if token not found', async () => {
      const provider = getDefaultProvider(types.Network.Localhost);

      const result = await provider.getTokenInfo('0x0000000000000000000000000000000000000000');

      expect(result).toBeNull();
    });
  });
});
