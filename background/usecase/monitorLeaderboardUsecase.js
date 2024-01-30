const {sleep} = require('../../core/util/util')

class MonitorLeaderboardUsecase {
    constructor({aptosRepo, leaderboardRepo}) {
        this.aptosRepo = aptosRepo;
        this.leaderboardRepo = leaderboardRepo;
    }

    // Listens for updates to the leaderboard then updates the db
    async monitorLeaderboard() {
        let currentBlockHeight = await this.aptosRepo.getBlockHeight()
        while (true) {
            let newBlockHeight = await this.aptosRepo.getBlockHeight()
            let latestTodoTxs = await this.aptosRepo.getLatestTodoTxs(currentBlockHeight, newBlockHeight)
            let latestTodoUpdates = await this.aptosRepo.getLatestTodoUpdates(latestTodoTxs)
            // Update the database with latest todo updates
            console.log('latestTodoUpdates', latestTodoUpdates)
            if (latestTodoUpdates.size > 0) {
                this.leaderboardRepo.incrementUserTodos(latestTodoUpdates)
            }
            // this.leaderboardRepo.updateLeaderBoard;
            currentBlockHeight = newBlockHeight
            await sleep(5000) 
        }
    }
}

module.exports = {MonitorLeaderboardUsecase}