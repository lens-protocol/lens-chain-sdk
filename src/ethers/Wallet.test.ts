import { expect, describe, it } from 'vitest';

import { getDefaultProvider, Network, Wallet } from '.';
import { factories } from './typechain';
import { tag } from '../../test';

tag('@write', () => {
  describe(`Given an "${Wallet.name}" instance`, () => {
    describe(`When calling "${Wallet.prototype.createErc20.name}" method`, () => {
      it(`Then should return the ERC-20 contract address`, async () => {
        const provider = getDefaultProvider(Network.Staging);
        const signer = new Wallet(import.meta.env.PRIVATE_KEY, provider);

        const address = await signer.createErc20({
          initialOwner: signer.address,
          initialSupply: 1000000,
          name: 'SDK Test Token',
          symbol: 'SDK',
        });

        const contract = factories.BasicErc20__factory.connect(address, signer);
        expect(await contract.name()).toBe('SDK Test Token');
      });
    });

    describe(`When calling "${Wallet.prototype.createErc20.name}" method`, () => {
      it(`Then should return the ERC-721 contract address`, async () => {
        const provider = getDefaultProvider(Network.Staging);
        const signer = new Wallet(import.meta.env.PRIVATE_KEY, provider);

        const address = await signer.createErc721({
          initialOwner: signer.address,
          maxSupply: 100,
          name: 'My Collection',
          symbol: 'SDK',
        });

        const contract = factories.BasicErc721__factory.connect(address, signer);
        expect(await contract.name()).toBe('My Collection');
      });
    });
  });
});
