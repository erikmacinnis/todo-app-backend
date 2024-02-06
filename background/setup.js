const { MonitorLeaderboardProcess } = require("./process/monitorLeaderboardProcess");
const { MonitorLeaderboardUsecase } = require("./usecase/monitorLeaderboardUsecase");
const { AptosRepo } = require("./repository/aptosRepo");
const { LeaderboardRepo } = require("./repository/leaderboardRepo");
const { AptosDatasource } = require("./datasource/aptosDatasource");
const { LeaderboardWebhook } = require("./webhook/leaderboardWebhook");
const LeaderboardWebsocket = require("./websocket/leaderboardWebsocket");
const { SetLeaderboardUsecase } = require("./usecase/setLeaderboardUsecase");
const { SetLeaderboardProcess } = require("./process/setLeaderboardProcess");

async function setupBackground(app) {

    // Setting up monitorLeaderboardProcess
    const aptosDatasource = new AptosDatasource({
        aptosNodeEndpoint: app.env.aptosNodeEndpoint,
        listenFunctionName: app.env.listenFunctionName,
        network: app.env.network,
        todoResourceName: app.env.todoResourceName,
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
    // Setting up monitor leaderboard
    const leaderboardWebsocket = new LeaderboardWebsocket({
        wss: app.wss,
        leaderboardRepo: leaderboardRepo,
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
    // Setting up setting leaderboard
    const setLeaderboardUsecase = new SetLeaderboardUsecase({
        aptosRepo: aptosRepo,
        leaderboardRepo: leaderboardRepo,
    })
    const setLeaderboardProcess = new SetLeaderboardProcess({
        setLeaderboardUsecase: setLeaderboardUsecase,
        env: app.env,
    })

    // Running MonitorLeaderboardProcess
    monitorLeaderboardProcess.run();
    setLeaderboardProcess.run();
}

module.exports = {setupBackground}