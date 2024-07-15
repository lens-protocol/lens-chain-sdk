import { expect, describe, it } from 'vitest';

import { getDefaultProvider, Network } from '.';
import { Provider } from './providers';

describe(`Given a "${Provider.name}" instance`, () => {
  describe(`When calling "${Provider.prototype.getTransactionReceipt.name}" method`, () => {
    it('Then should return the transaction receipt', async () => {
      const provider = getDefaultProvider(Network.Testnet);

      const receipt = await provider.getTransactionReceipt(
        '0x2fe9d9df84dc96d942e4430af9a0344201a534f79e0c4026a9086901cc28163b',
      );

      expect(receipt).toMatchObject({
        type: 2,
      });
    });
  });

  describe(`When calling "${Provider.prototype.getBlockNumberByTime.name}" method`, () => {
    const provider = getDefaultProvider(Network.Testnet);

    it('Then it should return the closest block number', async () => {
      const result = await provider.getBlockNumberByTime('before', Math.floor(Date.now() / 1000));

      expect(result).toEqual(expect.hexString());
    });

    it('Then it should return null if not found', async () => {
      const result = await provider.getBlockNumberByTime('after', Math.floor(Date.now() / 1000));

      expect(result).toBeNull();
    });
  });

  describe(`When calling "${Provider.prototype.getContractCreation.name}" method`, () => {
    const provider = getDefaultProvider(Network.Testnet);

    it('Then it should return the relevant contract creation information', async () => {
      const [details] = await provider.getContractCreation([
        '0xe05715a3e605bbb7f058d83de829bb5063f3da1c',
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
    const provider = getDefaultProvider(Network.Testnet);

    it('Then it should return the given token info', async () => {
      const result = await provider.getTokenInfo('0xe05715a3e605bbb7f058d83de829bb5063f3da1c');

      expect(result).toMatchObject({
        contractAddress: expect.evmAddress('0xe05715a3e605bbb7f058d83de829bb5063f3da1c'),
        iconURL: null,
        l1Address: null,
        liquidity: null,
        symbol: 'SDK',
        tokenDecimal: 18,
        tokenName: 'SDK Test Token',
        tokenPriceUSD: null,
      });
    });

    it('Then it should return null if token not found', async () => {
      const result = await provider.getTokenInfo('0x0000000000000000000000000000000000000000');

      expect(result).toBeNull();
    });
  });

  describe(`When calling "${Provider.prototype.getTokenTxHistory.name}" method`, () => {
    it.only('Then it should return a paginated list of token transfers', async () => {
      const provider = getDefaultProvider(Network.Testnet);

      const { items } = await provider.getTokenTxHistory({
        address: '0x00A58BA275E6BFC004E2bf9be121a15a2c543e71',
        filterForContractAddress: '0xe0fF46E1B235AEefa1F242d6d91357f88CcAc78a',
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
        tokenId: expect.toBeOneOf([null, expect.hexString()]),
        tokenName: expect.toBeOneOf([null, expect.any(String)]),
        tokenSymbol: expect.toBeOneOf([null, expect.any(String)]),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tokenDecimal: expect.any(Number),
        transactionType: expect.hexString(),
      });
    });
  });

  describe(`When calling "${Provider.prototype.getContractABI.name}" method`, () => {
    const provider = getDefaultProvider(Network.Testnet);

    it('Then it should return the contract ABI as JSON string', async () => {
      const abi = await provider.getContractABI('0x44D3f533C370C9Ed8cfbe2d77b4440DC74959508');

      expect(abi).toEqual(expect.stringMatching(/^\[{"inputs":/));
    });

    it('Then it should return null if not available', async () => {
      const abi = await provider.getContractABI('0x0000000000000000000000000000000000000000');

      expect(abi).toBeNull();
    });
  });

  describe(`When calling "${Provider.prototype.getTokenBalance.name}" method`, () => {
    const provider = getDefaultProvider(Network.Testnet);

    it('Then it should return the balance as hex string', async () => {
      const balance = await provider.getTokenBalance(
        '0x00A58BA275E6BFC004E2bf9be121a15a2c543e71',
        '0x175a469603aA24EE4ef1F9B0B609e3F0988668B1',
      );

      expect(balance).toEqual(expect.hexString());
    });

    it('Then it should return "0x0" in any other scenario', async () => {
      const balance = await provider.getTokenBalance(
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      );

      expect(balance).toEqual('0x0');
    });
  });
});
