import { expect, describe, it } from 'vitest';

import { getDefaultProvider, Network, Wallet } from '.';
import { factories } from './typechain';
import { tag } from '../../test';

tag('@write', () => {
  describe(`Given an "${Wallet.name}" instance`, () => {
    describe(`When calling "${Wallet.prototype.createERC20.name}" method`, () => {
      it(`Then should return the ERC-20 contract address`, async () => {
        const provider = getDefaultProvider(Network.Testnet);
        const signer = new Wallet(import.meta.env.PRIVATE_KEY, provider);

        const address = await signer.createERC20({
          admins: [],
          decimals: 18,
          iconURI: 'https://example.com/icon.png',
          initialOwner: signer.address,
          maxSupply: 100_000_000_000_000_000_000n,
          minters: [],
          mintRate: 0,
          name: 'SDK Test Token',
          symbol: 'SDK',
        });

        const contract = factories.LensERC20__factory.connect(address, signer);
        expect(await contract.name()).toBe('SDK Test Token');
      });
    });

    describe(`When calling "${Wallet.prototype.createERC721.name}" method`, () => {
      it(`Then should return the ERC-721 contract address`, async () => {
        const provider = getDefaultProvider(Network.Testnet);
        const signer = new Wallet(import.meta.env.PRIVATE_KEY, provider);

        const address = await signer.createERC721({
          admins: [],
          iconURI: 'https://example.com/icon.png',
          initialOwner: signer.address,
          maxSupply: 42,
          minters: [],
          mintRate: 0,
          name: 'My Collection',
          symbol: 'SDK',
        });

        const contract = factories.LensERC721__factory.connect(address, signer);
        expect(await contract.name()).toBe('My Collection');
      });
    });
  });
});
