const { Network } = require('@lens-chain/sdk/ethers');

console.table(Object.entries(Network).filter(([, value]) => typeof value !== 'string'));
