class MonitorLeaderboardProcess {
    constructor({monitorLeaderboardUsecase, env}) {
        this.monitorLeaderboardUsecase = monitorLeaderboardUsecase;
        this.env = env;
    }

    async run() {
        await this.monitorLeaderboardUsecase.monitorLeaderboard();
    }
}

module.exports = {MonitorLeaderboardProcess}