const WebSocket = require('ws');

class LeaderboardWebsocket {
    constructor({wss}) {
        this.wss = wss;
    }

    async sendLeaderboardData(leaderboardData) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(leaderboardData));
            }
        });
    }
}

module.exports = LeaderboardWebsocket