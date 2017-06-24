const SenderContext = require('../bot/SenderContext');

class BotDatabase {
    constructor(connection, models) {
        this._connection = connection;
        this._models = models;
    }

    get connection() {
        return this._connection;
    }

    get models() {
        return this._models;
    }

    registrateSender(user) {
        return this._models.Sender.create({
            externalId: user._id,
        });
    }

    findWebhook() {
        return this._models.Webhook.findOne();
    }

    createWebhook(externalId, target, triggers, secret) {
        return this._models.Webhook.create({
            externalId,
            target,
            triggers,
            secret,
        });
    }

    getSenderByExternalId(externalId) {
        return this._models.Sender.findOne({
            where: { externalId, },
        });
    }

    setSenderContext(senderId, context) {
        return this._models.Sender.update(
            {
                chatState: (new SenderContext(context)).serialize(),
            },
            {
                where: { id: senderId, },
            }
        );
    }
}

module.exports = BotDatabase;
