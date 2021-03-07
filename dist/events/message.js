"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEvent_1 = __importDefault(require("../structures/BaseEvent"));
class MessageEvent extends BaseEvent_1.default {
    constructor() {
        super('message');
    }
    async run(client, message) {
        var _a, _b;
        if (message.author.bot)
            return;
        const data = {};
        if (message.guild) {
            const guildData = await client.databaseManiger.get((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id);
            if (!guildData && message.guild)
                await client.databaseManiger.new(message.guild.id);
            data.guildData = guildData;
            data.prefix = guildData === null || guildData === void 0 ? void 0 : guildData.Prefix;
        }
        const messagaArray = message.content.split(/ +/g);
        const command = messagaArray[0].toLowerCase();
        const args = messagaArray.slice(1);
        if (!data.prefix)
            return;
        if (new RegExp(`<@!${client.user.id}>`).test(command))
            return message.send('Prefix_fetched', data.prefix);
        if (!command.startsWith(data.prefix))
            return;
        if (command.slice(data.prefix.length) === 'guildmemberadd' && message.member) {
            const member = ((_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first()) || message.member;
            return client.emit('guildMemberAdd', member);
        }
        const cmd = client.commands.get(command.slice(data.prefix.length)) ||
            client.commands.get(client.aliases.get(command.slice(data.prefix.length)) || '');
        if (!cmd)
            return;
        data.cmd = cmd.name;
        if (cmd.gard && message.member) {
            const check = cmd.gard.check(message.member);
            if (check.clientCheck)
                return message.send('Missing_perms', 'client', check.perms.client);
            if (check.memberCheck)
                return message.send('Missing_perms', 'member', check.perms.member);
        }
        if (cmd) {
            try {
                await cmd.run(client, message, args, data);
            }
            catch (error) {
                message.error(error);
            }
        }
    }
}
exports.default = MessageEvent;
