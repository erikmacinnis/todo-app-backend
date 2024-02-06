const {sleep} = require('../../core/util/util')

class SetLeaderboardUsecase {
    constructor({aptosRepo, leaderboardRepo, leaderboardMessenger}) {
        this.aptosRepo = aptosRepo;
        this.leaderboardRepo = leaderboardRepo;
        this.leaderboardMessenger = leaderboardMessenger;
    }

    // Listens for updates to the leaderboard then updates the db
    async setLeaderboard() {
        while (true) {
            try {
                const addrs = await this.leaderboardRepo.getAllAddrs()
                console.log(addrs)
                const addrToNumCompleteTodos = await this.aptosRepo.allUsersCompletedTodos(addrs)
                if (addrToNumCompleteTodos != null) {
                    console.log(addrToNumCompleteTodos)
                    await this.leaderboardRepo.setLeaderboard(addrToNumCompleteTodos)
                }
                // does this every 10 minutes
                // await sleep(600000)
                await sleep(10000)
            } catch (err) {
                console.error(err)
                await sleep(10000)
            }
        }
    }
}

module.exports = {SetLeaderboardUsecase}