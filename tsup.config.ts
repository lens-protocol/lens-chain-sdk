/* eslint-disable import/no-default-export */
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: {
    viem: 'src/viem/index.ts',
    ethers: 'src/ethers/index.ts',
  },
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  treeshake: true,
  clean: true,
  config: 'tsconfig.build.json',
  bundle: true,
  minify: !options.watch,
  dts: true,
  platform: 'neutral',
  format: ['esm'],
}));
