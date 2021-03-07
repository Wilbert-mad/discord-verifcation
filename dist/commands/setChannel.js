"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = __importDefault(require("../structures/BaseCommand"));
class SetChannel extends BaseCommand_1.default {
    constructor() {
        super('setchannel', {
            aliases: ['sch'],
        });
    }
    async run(client, message, [IDch]) {
        var _a;
        if (!message.guild)
            return;
        const channel = message.mentions.channels.first() || ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get(IDch));
        if (!channel)
            return message.channel.send('❌ | No channel found!');
        await client.databaseManiger
            .update('ChannelId', channel.id, message.guild.id)
            .catch(e => message.channel.send(`Error updating channel: ${e.message || e}`))
            .then(() => message.channel.send(`Channel set to ${channel.toString()}`));
        console.log(await client.databaseManiger.get(message.guild.id));
    }
}
exports.default = SetChannel;
