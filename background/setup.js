const { MonitorLeaderboardProcess } = require("./process/monitorLeaderboardProcess");
const { MonitorLeaderboardUsecase } = require("./usecase/monitorLeaderboardUsecase");
const { AptosRepo } = require("./repository/aptosRepo");
const { LeaderboardRepo } = require("./repository/leaderboardRepo");
const { AptosDatasource } = require("./datasource/aptosDatasource");
const { LeaderboardWebhook } = require("./webhook/leaderboardWebhook");
const LeaderboardWebsocket = require("./websocket/leaderboardWebsocket");

async function setupBackground(app) {

    // Setting up monitorLeaderboardProcess
    const aptosDatasource = new AptosDatasource({
        aptosNodeEndpoint: app.env.aptosNodeEndpoint,
        listenFunctionName: app.env.listenFunctionName,
        network: app.env.network,
    })
    const leaderboardRepo = new LeaderboardRepo({
        db: app.db,
        dbAdminUuid: app.env.dbAdminUuid,
    })
    const aptosRepo = new AptosRepo({
        aptosDatasource: aptosDatasource,
    })
    // const leaderboardWebhook = new LeaderboardWebhook({
    //     frontendAddr: app.env.frontendAddr,
    // })
    console.log(app.wss)
    const leaderboardWebsocket = new LeaderboardWebsocket({
        wss: app.wss,
    })
    const monitorLeaderboardUsecase = new MonitorLeaderboardUsecase({
        aptosRepo: aptosRepo,
        leaderboardRepo: leaderboardRepo,
        leaderboardMessenger: leaderboardWebsocket,
    })
    const monitorLeaderboardProcess = new MonitorLeaderboardProcess({
        monitorLeaderboardUsecase: monitorLeaderboardUsecase,
        env: app.env,
    });

    // Running MonitorLeaderboardProcess
    monitorLeaderboardProcess.run();
}

module.exports = {setupBackground}