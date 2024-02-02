const express = require('express');
const { WebSocketServer } = require('ws');

const {setupEnv} = require('./env.js');
const {getPgAdminClient} = require('./database.js')

class App {
    constructor() {
        const server = express();
        const env = setupEnv();
        const wss = new WebSocketServer({port: env.wsPort})

        wss.on('connection', (stream) => {
            console.log(`Connected to websocket at port ${env.wsPort}`)
        });
        
        this.server = server;
        this.wss = wss;
        this.env = env;
        this.db = getPgAdminClient(env);
    }

    async listen() {
        this.server.listen(this.env.serverPort, async () => {
            console.log(`Server listening at ${this.env.serverAddr}:${this.env.serverPort}`);
        });
    }
}

module.exports = { App }