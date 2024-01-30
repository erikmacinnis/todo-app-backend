const { Client } = require('pg'); 


function getPgAdminClient(env) {
    const client =  new Client({
        user: env.dbUser,
        host: env.dbHost,
        database: env.dbName,
        password: env.dbPassword,
        port: env.dbPort,
    });

    client.connect()
        .then(() => { console.log('Connected to PostgreSQL database!'); })
        .catch((err) => { console.error('Error connecting to the database:', err); });

    return client
}

module.exports = { getPgAdminClient }


