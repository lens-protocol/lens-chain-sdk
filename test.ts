import { describe } from 'vitest';

export type TestLabel = '@write';

/**
 * Tag a test with a label to isolate it from the rest of the tests
 * and be able to run it separately using the `TEST_TAGS` environment variable.
 *
 * @example
 * ```ts
 * describe('Something', () => {
 *   tag('@write', () => {
 *     it(`should work`, async () => {
 *       // ...
 *     });
 *   });
 * });
 * ```
 */
export function tag(label: TestLabel, fn: () => void) {
  if ((process.env.TEST_TAGS?.split(',') ?? []).includes(label)) {
    describe.only(`[tag: ${label}]`, fn, { timeout: 10000 });
  }
}
