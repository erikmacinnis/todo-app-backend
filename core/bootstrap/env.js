require('dotenv').config();

class Env {
    constructor({
        dbUser,
        dbHost,
        dbName,
        dbPassword,
        dbPort,
        dbAdminUuid,
        serverAddr,
        serverPort,
        network,
        aptosNodeEndpoint,
        listenFunctionName,
    }) {
        this.dbUser = dbUser;
        this.dbHost = dbHost;
        this.dbName = dbName;
        this.dbPassword = dbPassword;
        this.dbPort = dbPort;
        this.dbAdminUuid = dbAdminUuid;
        this.serverAddr = serverAddr;
        this.serverPort = serverPort;
        this.network = network;
        this.aptosNodeEndpoint = aptosNodeEndpoint;
        this.listenFunctionName = listenFunctionName;
    }
}

function setupEnv() {
    const env = new Env({
        dbUser: process.env.DB_USER,
        dbHost: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
        dbPassword: process.env.DB_PASS,
        dbPort: process.env.DB_PORT,
        dbAdminUuid: process.env.DB_ADMIN_UUID,
        serverAddr: process.env.SERVER_ADDR,
        serverPort: process.env.SERVER_PORT,
        network: process.env.NETWORK,
        aptosNodeEndpoint: process.env.APTOS_NODE_ENDPOINT,
        listenFunctionName: process.env.LISTEN_FUNCTION_NAME,
    })

    return env
}

module.exports = {setupEnv}