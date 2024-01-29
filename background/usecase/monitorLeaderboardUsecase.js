const {sleep} = require('../../core/util/util')

class MonitorLeaderboardUsecase {
    constructor(aptosRepo, leaderboardRepo) {
        this.aptosRepo = aptosRepo;
        this.leaderboardRepo = leaderboardRepo;
    }

    // Listens for updates to the leaderboard then updates the db
    async monitorLeaderboard() {
        // console.log(this.aptosRepo)
        let currentBlockHeight = this.aptosRepo.getBlockHeight()
        while (true) {
            let newBlockHeight = this.aptosRepo.getBlockHeight()
            let latestTodoTxs = await this.aptosRepo.getLatestTodoTxs(currentBlockHeight, newBlockHeight)
            console.log('latestTodoTxs', latestTodoTxs)
            let latestTodoUpdates = await this.aptosRepo.getLatestTodoUpdates(latestTodoTxs)
            // Update the database with latest todo updates
            console.log('latestTodoUpdates', latestTodoUpdates)
            // this.leaderboardRepo.updateLeaderBoard;
            currentBlockHeight = newBlockHeight
            await sleep(5000) 
        }
    }
}

module.exports = {MonitorLeaderboardUsecase}