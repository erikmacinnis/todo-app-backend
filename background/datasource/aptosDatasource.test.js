const { Aptos, AptosConfig, Network, AccountAddress } = require("@aptos-labs/ts-sdk");
const axios = require('axios');
const { AptosDatasource } = require('./aptosDatasource');

jest.mock('@aptos-labs/ts-sdk');
jest.mock('axios');

describe('AptosDatasource', () => {
    let datasource;

    beforeEach(() => {
        datasource = new AptosDatasource({
            aptosNodeEndpoint: 'http://localhost:8080',
            listenFunctionName: '91ac8ddb4b1a7b91c40577f24d295bbf292d7aa31d0aa52d10148f8822de57e9::Todo::check_task',
            network: 'testnet'
        });
    });

    describe('getBlockHeight', () => {
        it('should fetch block height from the API', async () => {
        axios.get.mockResolvedValueOnce({ data: { block_height: 123 } });

        const blockHeight = await datasource.getBlockHeight();

        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080');
        expect(blockHeight).toBe(123);
        });
    });

    describe('getUsersTodoEvents', () => {
        it('should fetch users todo events', async () => {
        // axios.get.mockResolvedValueOnce({ data: { block_height: 123 } });

        const events = await datasource.getUserTodoEvents('0x949d60b0604cbb3f4b0dfe5a4ba38604e07028224d24f476222fd927660bdcd0');

        console.log('events', events)

        // expect(axios.get).toHaveBeenCalledWith('http://localhost:8080');
        // expect(blockHeight).toBe(123);
        });
    });
});