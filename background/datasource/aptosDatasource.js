const { Aptos, AptosConfig, Network } = require("@aptos-labs/ts-sdk");

class AptosDatasource {
    constructor(aptosEndpoint, listenFunctionName, network) {
        let aptosConfig;
        switch (network) {
            case 'testnet':
                aptosConfig = new AptosConfig({ network: Network.TESTNET });
            case 'mainnet':
                aptosConfig = new AptosConfig({ network: Network.MAINNET });
            default:
                aptosConfig = new AptosConfig({ network: Network.MAINNET });
        }
        const aptos = new Aptos(aptosConfig);

        this.aptos = aptos;
        this.aptosEndpoint = aptosEndpoint;
        this.listenFunctionName = listenFunctionName;
    }

    async getBlockHeight() {
        const response = await axios.get(process.env.APTOS_NODE);
        return parseInt(response.data.block_height);
    }

    async getBlockByHeight(height) {
        return await this.aptos.getBlockByHeight({
            blockHeight: blockHeight,
            options: {
                withTransactions: true,
            }
        },)
    }
}

module.exports = {AptosDatasource}

