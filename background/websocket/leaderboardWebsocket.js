const WebSocket = require('ws');

class LeaderboardWebsocket {
    constructor({wss, leaderboardRepo}) {
        this.wss = wss;
        this.leaderboardRepo = leaderboardRepo;

        this.wss.on('connection', (ws) => {
            this.onOpen(ws);
        });
    }

    async onOpen(ws) {
        const leaderboardData = await this.leaderboardRepo.getTopUsers()
        ws.send(JSON.stringify(leaderboardData));
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