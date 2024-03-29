require('dotenv').config();

class Env {
    constructor({
        dbUser,
        dbHost,
        dbName,
        dbPassword,
        dbPort,
        dbAdminUuid,
        wsPort,
        serverAddr,
        serverPort,
        network,
        aptosNodeEndpoint,
        listenFunctionName,
        todoResourceName,
        frontendAddr,
    }) {
        this.dbUser = dbUser;
        this.dbHost = dbHost;
        this.dbName = dbName;
        this.dbPassword = dbPassword;
        this.dbPort = dbPort;
        this.dbAdminUuid = dbAdminUuid;
        this.wsPort = wsPort,
        this.serverAddr = serverAddr;
        this.serverPort = serverPort;
        this.network = network;
        this.aptosNodeEndpoint = aptosNodeEndpoint;
        this.listenFunctionName = listenFunctionName;
        this.todoResourceName = todoResourceName;
        this.frontendAddr = frontendAddr;
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
        wsPort: process.env.WS_PORT,
        serverAddr: process.env.SERVER_ADDR,
        serverPort: process.env.SERVER_PORT,
        network: process.env.NETWORK,
        aptosNodeEndpoint: process.env.APTOS_NODE_ENDPOINT,
        listenFunctionName: process.env.LISTEN_FUNCTION_NAME,
        todoResourceName: process.env.TODO_RESOURCE_NAME,
        frontendAddr: process.env.FRONTEND_ADDR,
    })

    return env
}

module.exports = {setupEnv}