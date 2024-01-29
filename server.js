require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Aptos, AptosConfig, Network } = require("@aptos-labs/ts-sdk");

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

const app = express();

// app.get('/getEvent', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(port, async () => {
    console.log(`Server listening at ${process.env.SERVER_ADDR}:${process.env.PORT}`);

    waitToUpdateLeaderboard()

    // let todoTxs = await getTodoTxsByBlock(205905121)
    // console.log(todoTxs)
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitToUpdateLeaderboard() {
    let currentBlockHeight = await getBlockHeight()
    while (true) {
        let newBlockHeight = await getBlockHeight();
        let latestTodoTxs = await getLatestTodoTxs(currentBlockHeight, newBlockHeight)
        console.log('latestTodoTxs', latestTodoTxs)
        let latestTodoUpdates = await getLatestTodoUpdates(latestTodoTxs)
        // Update the database with latest todo updates
        console.log('latestTodoUpdates', latestTodoUpdates)
        currentBlockHeight = newBlockHeight
        await sleep(5000) 
    }
}

async function getLatestTodoTxs(oldBlockHeight, currentBlockHeight) {
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
function getLatestTodoUpdates(latestTodoTxs) {
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

async function  getBlockHeight() {
    try {
        const response = await axios.get(process.env.APTOS_NODE);
        return parseInt(response.data.block_height);
    } catch (error) {
        console.error(error);
    }
}

async function getTodoTxsByBlock(blockHeight) {
    const block = await aptos.getBlockByHeight({
        blockHeight: blockHeight,
        options: {
            withTransactions: true,
        }
    })

    const blockTxs = block.transactions
    let txs = [];
    for (let tx of blockTxs) {
        if (tx.payload != null && tx.payload.function == process.env.FUNCTION_NAME) {
            txs.push(tx)
        }
    }

    return txs;
}