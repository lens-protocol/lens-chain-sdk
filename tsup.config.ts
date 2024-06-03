/* eslint-disable import/no-default-export */
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: {
    'viem/index': 'src/viem/index.ts',
    'ethers/index': 'src/ethers/index.ts',
    'ethers/globals': 'src/ethers/globals.ts',
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
