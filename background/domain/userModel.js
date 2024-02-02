class UserModel {
    constructor({address, numCompleteTodos}) {
        this.address = address;
        this.numCompleteTodos = numCompleteTodos;
    }
}

module.exports = {UserModel}