class AptosRepo {
    constructor(aptosDatasource) {
        this.aptosDatasource = aptosDatasource;
    }

    async getBlockHeight() {
        return this.aptosDatasource.getBlockHeight()
    }

    // Gets the latest transactions
    async getLatestTodoTxs(oldBlockHeight, currentBlockHeight) {
        let numBlocks = currentBlockHeight - oldBlockHeight

        let getTxArr = []
        for (let i = 0; i < numBlocks; i++) {
            let blockNumber = oldBlockHeight + i + 1;
            getTxArr.push((getTodoTxsByBlock(blockNumber)))
        }
    
        console.log('oldBlockHeight', oldBlockHeight)
        console.log('currentBlockHeight', currentBlockHeight)
    
    
        const txArr = await Promise.all(getTxArr)
    
        console.log(txArr)
    
        return txArr.flat()
    }

    // Get mapping of updates to leaderboard
    // Can update the db here or after this func
    getLatestTodoUpdates(latestTodoTxs) {
        const userToNumTodos = new Map()
        for (let todoTx of latestTodoTxs) {
            const userAddr = todoTx.sender
            if (userToNumTodos.has(userAddr)) {
                userToNumTodos.set(userAddr, userToNumTodos.get(userAddr) + 1)
            // new user
            } else {
                userToNumTodos.set(userAddr, 1)
            }
        }
        return userToNumTodos;
    }

    // Gets list of all todo listen
    async getTodoTxsByBlock(blockHeight) {
        const block = await this.aptosDatasource.getBlockByHeight(blockHeight)
    
        const blockTxs = block.transactions
        let txs = [];
        for (let tx of blockTxs) {
            if (tx.payload != null && tx.payload.function == aptosDatasource.listenFunctionName) {
                txs.push(tx)
            }
        }
    
        return txs;
    }
}

module.exports = {AptosRepo}