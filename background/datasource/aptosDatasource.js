const { Aptos, AptosConfig, Network } = require("@aptos-labs/ts-sdk");
const axios = require('axios');

class AptosDatasource {
    constructor({aptosNodeEndpoint, listenFunctionName, network}) {
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
}

module.exports = {AptosDatasource}

