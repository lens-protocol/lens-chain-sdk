import { expect } from 'vitest';

function isHexString(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('0x') && value.length > 2;
}

expect.extend({
  evmAddress: (received, expected) => {
    return {
      pass:
        isHexString(received) && received.length === 42 && expected ? expected === received : true,
      message: () => `expected ${received} to be an EVM address (0x...)`,
    };
  },
  hexString: (received) => {
    return {
      pass: isHexString(received) && received.length > 2,
      message: () => `expected ${received} to be an hex string (0x...)`,
    };
  },
});
