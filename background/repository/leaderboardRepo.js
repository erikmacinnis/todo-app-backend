const { v4: uuidv4 } = require('uuid');

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
            const createdOn = new Date().toISOString();
            const query = 'INSERT INTO users (id, address, num_complete_todos, created_on, created_by) VALUES ($1, $2, $3, $4, $5)';
            const values = [id, address, numTodos, createdOn, this.dbAdminUuid];
            
            await this.db.query(query, values);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async incrementNumCompleteTodos(address, numTodos) {
        try {
            const updatedOn = new Date().toISOString();
            const query = 'UPDATE users SET num_complete_todos = num_complete_todos + $1 AND updated_on = $2 AND  WHERE address = $3';
            await this.db.query(query, [numTodos, updatedOn, address]);
        } catch (err) {
            console.error(err);
            throw err;
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
}

module.exports = {LeaderboardRepo}