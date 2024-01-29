const { Client } = require('pg'); 


function getPgAdminClient(env) {
    const client =  new Client({
        user: env.user,
        host: env.host,
        database: env.database,
        password: env.password,
        port: env.dbPort,
    });

    client.connect()
        .then(() => { console.log('Connected to PostgreSQL database!'); })
        .catch((err) => { console.error('Error connecting to the database:', err); });

    return client
}

module.exports = { getPgAdminClient }


