const { v4: uuidv4 } = require('uuid');
const {UserModel} = require('../domain/userModel.js')

class LeaderboardRepo {
    constructor({db, dbAdminUuid}) {
        this.db = db;
        this.dbAdminUuid = dbAdminUuid;
    }

    async userExistsWithAddress(address) {
        try {
            const res = await this.db.query('SELECT id FROM users WHERE LOWER(address) = LOWER($1)', [address]);
            return res.rows.length > 0;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async addUser(address, numTodos) {
        try {
            const id = uuidv4();
            const query = 'INSERT INTO users (id, address, num_complete_todos, created_on, created_by) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)';
            const values = [id, address, numTodos, this.dbAdminUuid];
            
            await this.db.query(query, values);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async incrementNumCompleteTodos(address, numTodos) {
        try {
            const updatedOn = new Date().toISOString();
            const query = `UPDATE users SET num_complete_todos = num_complete_todos + ${numTodos}, updated_on = CURRENT_TIMESTAMP WHERE address = '${address}'`;
            await this.db.query(query);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async setNumCompleteTodos(address, numTodos) {
        try {
            const updatedOn = new Date().toISOString();
            const query = `UPDATE users SET num_complete_todos = ${numTodos}, updated_on = CURRENT_TIMESTAMP WHERE address = '${address}'`;
            await this.db.query(query);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async setLeaderboard(addressToNumTodos) {
        for (let [address, numTodos] of addressToNumTodos) {
            try {
                if (await this.userExistsWithAddress(address)) {
                    this.setNumCompleteTodos(address, numTodos)
                } else {
                    this.addUser(address, numTodos)
                }
            } catch(err) {
                console.error(err)
            }
        }
    }

    async incrementUserTodos(addressToNumTodos) {
        for (let [address, numTodos] of addressToNumTodos) {
            try {
                if (await this.userExistsWithAddress(address)) {
                    this.incrementNumCompleteTodos(address, numTodos)
                } else {
                    this.addUser(address, numTodos)
                }
            } catch(err) {
                console.error(err)
            }
        }
    }

    // Gets all users in order of most numCompleteTodos to the least
    async getTopUsers() {
        try {
            const res = await this.db.query('SELECT address, num_complete_todos FROM users ORDER BY num_complete_todos DESC LIMIT 100');
            return res.rows.map(row => new UserModel({ address: row.address, numCompleteTodos: row.num_complete_todos }));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getAllAddrs() {
        try {
            const res = await this.db.query('SELECT address FROM users');
            return res.rows.map(row => row.address);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = {LeaderboardRepo}