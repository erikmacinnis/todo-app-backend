const { MonitorLeaderboardProcess } = require("./process/monitorLeaderBoardProcess");
const { MonitorLeaderboardUsecase } = require("./usecase/monitorLeaderboardUsecase");
const { AptosRepo } = require("./repository/aptosRepo");
const { LeaderboardRepo } = require("./repository/leaderboardRepo");
const { AptosDatasource } = require("./datasource/aptosDatasource");

async function setupBackground(app) {

    // Setting up monitorLeaderboardProcess
    const aptosDatasource = new AptosDatasource({
        aptosNodeEndpoint: app.env.aptosNodeEndpoint,
        listenFunctionName: app.env.listenFunctionName,
        network: app.env.network,
    })
    console.log(aptosDatasource)
    const leaderboardRepo = new LeaderboardRepo({
        db: app.db,
    })
    console.log(leaderboardRepo)
    const aptosRepo = new AptosRepo({
        aptosDatasource: aptosDatasource,
    })
    console.log(aptosRepo)
    const monitorLeaderboardUsecase = new MonitorLeaderboardUsecase({
        aptosRepo: aptosRepo,
        leaderboardRepo: leaderboardRepo,
    })
    await monitorLeaderboardUsecase.monitorLeaderboard();
    const monitorLeaderboardProcess = new MonitorLeaderboardProcess({
        monitorLeaderboardUsecase: monitorLeaderboardUsecase,
        env: app.env,
    });

    // Running MonitorLeaderboardProcess
    monitorLeaderboardProcess.run();
}

module.exports = {setupBackground}