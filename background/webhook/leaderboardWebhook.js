const axios = require('axios');

class LeaderboardWebhook {
    constructor({frontendAddr}) {
        this.frontendAddr = frontendAddr;
    }

    async sendLeaderboardData(leaderboardData) {
        console.log(`${this.frontendAddr}leaderboard`)
        await axios.post(`${this.frontendAddr}leaderboard`, leaderboardData)
    }
}

module.exports = {LeaderboardWebhook}