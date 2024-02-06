class SetLeaderboardProcess {
    constructor({setLeaderboardUsecase, env}) {
        this.setLeaderboardUsecase = setLeaderboardUsecase;
        this.env = env;
    }

    async run() {
        await this.setLeaderboardUsecase.setLeaderboard();
    }
}

module.exports = {SetLeaderboardProcess}