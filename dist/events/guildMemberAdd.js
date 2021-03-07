"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const BaseEvent_1 = __importDefault(require("../structures/BaseEvent"));
class guildMemberAdd extends BaseEvent_1.default {
    constructor() {
        super('guildMemberAdd');
    }
    async run(client, member) {
        var _a;
        const data = await member.guild.data();
        if (!data)
            return;
        const welcomeChannel = member.guild.channels.cache.get(data.ChannelId || '');
        if (welcomeChannel && data.Message) {
            const welcomeEmbed = new discord_js_1.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(member.user.username)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setDescription(client.verifyMessage(data.Message, member, data.Roles))
                .setTimestamp();
            // NOTE: change this to a webhook in the future??
            welcomeChannel.send(welcomeEmbed).catch(_e => { });
        }
        if (data.Roles.length > 0 && data.VarifactionMode === 'noneOff') {
            const rolesArray = client.databaseManiger.parse(data.Roles);
            if (!((_a = member.guild.me) === null || _a === void 0 ? void 0 : _a.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR')))
                return;
            for (const role of rolesArray)
                member.roles.add(role).catch(_e => { });
        }
        if (data.AllowDM == 1 && data.DmMessage) {
            member.send(client.verifyMessage(data.DmMessage, member, data.Roles)).catch(_e => { });
        }
    }
}
exports.default = guildMemberAdd;
