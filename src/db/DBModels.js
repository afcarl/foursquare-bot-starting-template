const Sender = require('./models/Sender');
const Webhook = require('./models/Webhook');

class DBModels {
    constructor(sequelize) {
        const models = [
            new Sender(),
            new Webhook()
        ];

        this._models = {};

        models.forEach((model) => {
            this._models[model._name] = sequelize.define(model._name, ...model.sequelizeModel);
        });
    }

    get models() {
        return this._models;
    }

    get Sender() {
        return this._models.Sender;
    }

    get Webhook() {
        return this._models.Webhook;
    }
}

module.exports = DBModels;
