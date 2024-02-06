const { Aptos, AptosConfig, Network, AccountAddress } = require("@aptos-labs/ts-sdk");
const axios = require('axios');

class AptosDatasource {
    constructor({aptosNodeEndpoint, listenFunctionName, todoResourceName, network}) {
        let aptosConfig;
        const networkStr = network.toString();
        switch (networkStr) {
            case 'testnet':
                aptosConfig = new AptosConfig({ network: Network.TESTNET });
                break;
            case 'mainnet':
                aptosConfig = new AptosConfig({ network: Network.MAINNET });
                break;
            default:
                aptosConfig = new AptosConfig({ network: Network.MAINNET });
                break;
        }
        const aptos = new Aptos(aptosConfig);

        this.aptos = aptos;
        this.aptosNodeEndpoint = aptosNodeEndpoint;
        this.listenFunctionName = listenFunctionName;
        this.todoResourceName = todoResourceName
    }

    async getBlockHeight() {
        const response = await axios.get(this.aptosNodeEndpoint);
        return parseInt(response.data.block_height);
    }

    async getBlockByHeight(blockHeight) {
        return await this.aptos.getBlockByHeight({
            blockHeight: blockHeight,
            options: {
                withTransactions: true,
            }
        },)
    }

    async getTodoResource(address) {
        const addr = AccountAddress.fromString(address)
        const todoResource = await this.aptos.getAccountResource({
            accountAddress: addr,
            resourceType: this.todoResourceName,
        })
        return todoResource
    }
}

module.exports = {AptosDatasource}

