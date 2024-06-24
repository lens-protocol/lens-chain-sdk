/* eslint-disable @typescript-eslint/naming-convention */

import type { AsymmetricMatchersContaining as BaseAsymmetricMatchersContaining } from 'vitest';

interface CustomMatchers<R = unknown> {
  evmAddress: (expected?: R) => R;
  hexString: () => R;
}

declare module 'vitest' {
  interface AsymmetricMatchersContaining
    extends CustomMatchers,
      BaseAsymmetricMatchersContaining<R> {}
}
