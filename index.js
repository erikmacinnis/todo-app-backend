const { setupBackground } = require('./background/setup');
const { routerSetup } = require('./core/api/route');
const { App } = require('./core/bootstrap/app')

function main() {
    const app = new App();

    const env = app.env;

    // routerSetup();

    setupBackground(app);

    app.listen();
}

main();