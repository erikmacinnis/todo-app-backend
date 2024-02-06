const {sleep} = require('../../core/util/util')

class MonitorLeaderboardUsecase {
    constructor({aptosRepo, leaderboardRepo, leaderboardMessenger}) {
        this.aptosRepo = aptosRepo;
        this.leaderboardRepo = leaderboardRepo;
        this.leaderboardMessenger = leaderboardMessenger;
    }

    // Listens for updates to the leaderboard then updates the db
    async monitorLeaderboard() {
        let currentBlockHeight = await this.aptosRepo.getBlockHeight()
        while (true) {
            try {
                let newBlockHeight = await this.aptosRepo.getBlockHeight()
                let latestTodoTxs = await this.aptosRepo.getLatestTodoTxs(currentBlockHeight, newBlockHeight)
                let latestTodoUpdates = await this.aptosRepo.getLatestTodoUpdates(latestTodoTxs)
                // Update the database with latest todo updates
                console.log('latestTodoUpdates', latestTodoUpdates)
                if (latestTodoUpdates.size > 0) {
                    await this.leaderboardRepo.incrementUserTodos(latestTodoUpdates)
                    const leaderboardData = await this.leaderboardRepo.getTopUsers()
                    await this.leaderboardMessenger.sendLeaderboardData(leaderboardData)
                }
                currentBlockHeight = newBlockHeight
                await sleep(5000) 
            } catch (err) {
                console.error(err)
                await sleep(5000) 
            }
        }
    }
}

module.exports = {MonitorLeaderboardUsecase}