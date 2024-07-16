import 'vitest';

interface CustomMatchers<R = unknown> {
  evmAddress: (expected?: R) => R;
  hexString: () => R;
}

declare module 'vitest' {
  interface AsymmetricMatchersContaining extends JestExtendedMatchers, CustomMatchers {}
}
