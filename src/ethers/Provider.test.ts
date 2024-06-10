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

  describe(`When calling "${Provider.prototype.getContractCreation.name}" method`, () => {
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

  describe(`When calling "${Provider.prototype.getTokenInfo.name}" method`, () => {
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

  describe(`When calling "${Provider.prototype.getTokenTxHistory.name}" method`, () => {
    it('Then it should return a paginated list of token transfers', async () => {
      const provider = getDefaultProvider(types.Network.Localhost);

      const { items } = await provider.getTokenTxHistory({
        address: '0x00a58ba275e6bfc004e2bf9be121a15a2c543e71',
        pageInfo: { page: 1, limit: 10, sort: 'asc' },
      });

      expect(items[0]).toMatchObject({
        hash: expect.hexString(),
        to: expect.evmAddress(),
        from: expect.evmAddress(),
        transactionIndex: expect.hexString(),
        input: expect.hexString(),
        value: expect.hexString(),
        gas: expect.hexString(),
        gasPrice: expect.hexString(),
        gasUsed: expect.hexString(),
        cumulativeGasUsed: expect.hexString(),
        fee: expect.hexString(),
        nonce: expect.hexString(),
        confirmations: expect.hexString(),
        blockNumber: expect.hexString(),
        blockHash: expect.hexString(),
        l1BatchNumber: expect.hexString(),
        timeStamp: expect.hexString(),
        contractAddress: expect.evmAddress(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tokenName: expect.any(String),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tokenSymbol: expect.any(String),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tokenDecimal: expect.any(String),
        transactionType: expect.hexString(),
      });
    });
  });

  describe(`When calling "${Provider.prototype.getContractABI.name}" method`, () => {
    it('Then it should return the contract ABI as JSON string', async () => {
      const provider = getDefaultProvider(types.Network.Localhost);

      const abi = await provider.getContractABI('0xA53ef3794DC285C20BEe9B51abD1942Ab5794a41');

      expect(abi).toEqual(expect.stringMatching(/^\[{"inputs":/));
    });

    it('Then it should return null if not available', async () => {
      const provider = getDefaultProvider(types.Network.Localhost);

      const abi = await provider.getContractABI('0x0000000000000000000000000000000000000000');

      expect(abi).toBeNull();
    });
  });
});
