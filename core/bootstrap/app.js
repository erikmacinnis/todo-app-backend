const express = require('express');

const {setupEnv} = require('./env.js');
const {getPgAdminClient} = require('./database.js')

class App {
    constructor() {
        const server = express();
        const env = setupEnv();

        this.server = server;
        this.env = env;
        this.db = getPgAdminClient(env);
    }

    async listen() {
        this.server.listen(this.env.serverPort, async () => {
            console.log(`Server listening at ${process.env.SERVER_ADDR}:${process.env.PORT}`);
        });
    }
}

module.exports = { App }