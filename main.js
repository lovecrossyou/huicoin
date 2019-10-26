const Blockchain = require('./src/Blockchain');
const Transaction = require('./src/Transaction');


const savjeeCoin = new Blockchain();

console.log('Creating some transactions...');
savjeeCoin.createTransaction(new Transaction('address1', 'address2', 100));
savjeeCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner...');
savjeeCoin.minePendingTransactions('xaviers-address');

console.log('Starting the miner again!');
savjeeCoin.minePendingTransactions("xaviers-address");

console.log('Balance of Xaviers address is', savjeeCoin.getBalanceOfAddress('xaviers-address'));
// 输出: 100
