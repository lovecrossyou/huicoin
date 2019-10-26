const Block = require('./Block');
const Transaction = require('./Transaction');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;

        // 在区块产生之间存储交易的地方
        this.pendingTransactions = [];

        // 挖矿回报
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction) {
        // 这里应该有一些校验!

        // 推入待处理交易数组
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0; // you start at zero!

        // 遍历每个区块以及每个区块内的交易
        for (const block of this.chain) {
            for (const trans of block.transactions) {

                // 如果地址是发起方 -> 减少余额
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                // 如果地址是接收方 -> 增加余额
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    minePendingTransactions(miningRewardAddress) {
        // 用所有待交易来创建新的区块并且开挖..
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        // 将新挖的看矿加入到链上
        this.chain.push(block);

        // 重置待处理交易列表并且发送奖励
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}


module.exports = Blockchain;