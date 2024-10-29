import { expect, describe, it } from 'vitest';

import { getDefaultProvider, Network } from '.';
import { Provider } from './providers';

describe(`Given a "${Provider.name}" instance`, () => {
  describe(`When calling a base class method`, () => {
    it('Then it should not break the prototype chain', async () => {
      const provider = getDefaultProvider(Network.Testnet);

      const receipt = await provider.getTransactionReceipt(
        '0x2fe9d9df84dc96d942e4430af9a0344201a534f79e0c4026a9086901cc28163b',
      );

      expect(receipt).toMatchObject({
        type: 2,
      });
    });
  });
});
