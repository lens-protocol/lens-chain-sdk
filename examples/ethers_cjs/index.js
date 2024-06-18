const { types } = require('@lens-network/sdk/ethers');

console.table(Object.entries(types.Network).filter(([, value]) => typeof value !== 'string'));
