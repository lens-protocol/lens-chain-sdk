const { Network } = require('@lens-network/sdk/ethers');

console.table(Object.entries(Network).filter(([, value]) => typeof value !== 'string'));
