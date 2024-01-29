require('dotenv').config();

class Env {
    constructor(
        dbUser,
        dbHost,
        dbName,
        dbPassword,
        dbPort,
        serverAddr,
        serverPort,
        network,
        aptosNodeEndpoint,
        listenFunctionName,
    ) {
        this.dbUser = dbUser;
        this.dbHost = dbHost;
        this.dbName = dbName;
        this.dbPassword = dbPassword;
        this.dbPort = dbPort;
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
        dbPassword: process.env.DB_PASSWORD,
        dbPort: process.env.DB_PORT,
        serverAddr: process.env.SERVER_ADDR,
        serverPort: process.env.SERVER_PORT,
        network: process.env.NETWORK,
        aptosNodeEndpoint: process.env.APTOS_NODE_ENDPOINT,
        listenFunctionName: process.env.LISTEN_FUNCTION_NAME,
    })

    return env
}

module.exports = {setupEnv}