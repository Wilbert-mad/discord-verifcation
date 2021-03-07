"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = __importDefault(require("../structures/BaseCommand"));
const databaseMainger_1 = require("../structures/databaseMainger");
class Verify extends BaseCommand_1.default {
    constructor() {
        super('verify');
    }
    async run(client, message, _args, data) {
        var _a, _b, _c;
        if (!message.guild || !message.member)
            return;
        if (message.channel.id === ((_a = data.guildData) === null || _a === void 0 ? void 0 : _a.ChannelVerifyingID))
            data.active = true;
        switch ((_b = data.guildData) === null || _b === void 0 ? void 0 : _b.VarifactionMode) {
            case databaseMainger_1.VarifactionModes.CHAT_EQUATION:
                if (!data.active)
                    return;
                const res = await client.validators.equationMode(message);
                if (res) {
                    const rolesArray = client.databaseManiger.parse(data.guildData.Roles);
                    if (!((_c = message.member.guild.me) === null || _c === void 0 ? void 0 : _c.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR')))
                        return;
                    for (const role of rolesArray)
                        message.member.roles.add(role).catch(_e => { });
                }
                break;
        }
    }
}
exports.default = Verify;
