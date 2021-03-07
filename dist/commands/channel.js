"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const BaseCommand_1 = __importDefault(require("../structures/BaseCommand"));
const databaseMainger_1 = require("../structures/databaseMainger");
const permissionGard_1 = __importDefault(require("../structures/permissionGard"));
class SetChannel extends BaseCommand_1.default {
    constructor() {
        super('channel', {
            aliases: ['ch'],
            sunCommands: true,
        }, new permissionGard_1.default(['MANAGE_GUILD' || 'ADMINISTRATOR'], [], { checkOwner: true }));
    }
    async run(client, message, [cmd, ...args], data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!message.guild)
            return;
        const helpCommand = new discord_js_1.MessageEmbed()
            .setAuthor('Channel sub Commands')
            .setDescription(`Avalable sub commands:\n \`welcome\` Sets the welcome channel.
        e.g: \`${data.prefix}channel welcome #welcome-channel\`
        \`dm\` Whether to dm the member on join.
        e.g: \`${data.prefix}channel dm (yes|no)\`
        \`dav\` Whether to delete a message from verification channel 
        after use or if its not a valid varifaction message (bot, spam).
        e.g: \`${data.prefix}channel dav (yes|no)\`
        \`verify\` Sets the verifying channel.
        e.g: \`${data.prefix}channel verify #channel \`
        \`mode\` Sets the mode in which a member is varifyed
        e.g: \`${data.prefix}channel mode (${databaseMainger_1.VarifactionModes.CHAT_EQUATION}|${databaseMainger_1.VarifactionModes.NONE})\``)
            .setTimestamp();
        switch (cmd) {
            case 'welcome': {
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
                if (!channel)
                    return message.channel.send('❌ | Channel not found!');
                await client.databaseManiger
                    .update('ChannelId', channel.id, message.guild.id)
                    .then(() => message.channel.send(`Channel set to ${channel.toString()}`))
                    .catch(e => message.channel.send(`Error updating channel: ${e.message || e}`));
                break;
            }
            case 'dm': {
                const res = args[0];
                if (res === 'yes' && ((_a = data.guildData) === null || _a === void 0 ? void 0 : _a.AllowDM) === 1) {
                    return message.channel.send('Setting alredy set to yes.');
                }
                else if (res === 'no' && ((_b = data.guildData) === null || _b === void 0 ? void 0 : _b.AllowDM) === 0) {
                    return message.channel.send('Setting alredy set to no.');
                }
                else if (res === 'no') {
                    client.databaseManiger
                        .update('AllowDM', 0, message.guild.id)
                        .then(() => {
                        message.channel.send('Setting turned off');
                    })
                        .catch(e => message.channel.send(`Error updating setting: ${e.message || e}`) && console.log(e));
                }
                else if (res === 'yes') {
                    client.databaseManiger
                        .update('AllowDM', 1, message.guild.id)
                        .then(() => {
                        message.channel.send('Setting turned on');
                    })
                        .catch(e => message.channel.send(`Error updating setting: ${e.message || e}`) && console.log(e));
                }
                else {
                    return message.channel.send('This is not a valid type! "yes" or "no"');
                }
                break;
            }
            case 'dav': {
                const res = args[0];
                if (res === 'yes' && ((_c = data.guildData) === null || _c === void 0 ? void 0 : _c.AllowDM) === 1) {
                    return message.channel.send('Setting alredy set to yes.');
                }
                else if (res === 'no' && ((_d = data.guildData) === null || _d === void 0 ? void 0 : _d.AllowDM) === 0) {
                    return message.channel.send('Setting alredy set to no.');
                }
                else if (res === 'no') {
                    client.databaseManiger
                        .update('DeleteAV', 0, message.guild.id)
                        .then(() => {
                        message.channel.send('Setting turned off');
                    })
                        .catch(e => message.channel.send(`Error updating setting: ${e.message || e}`) && console.log(e));
                }
                else if (res === 'yes') {
                    client.databaseManiger
                        .update('DeleteAV', 1, message.guild.id)
                        .then(() => {
                        message.channel.send('Setting turned on');
                    })
                        .catch(e => message.channel.send(`Error updating setting: ${e.message || e}`) && console.log(e));
                }
                else {
                    return message.channel.send('This is not a valid type! "yes" or "no"');
                }
            }
            case 'verify': {
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
                if (!channel)
                    return message.channel.send('❌ | Channel not found!');
                await client.databaseManiger
                    .update('ChannelVerifyingID', channel.id, message.guild.id)
                    .then(() => message.channel.send(`Verify channel set to ${channel.toString()}`))
                    .catch(e => message.channel.send(`Error updating verify channel: ${e.message || e}`));
                break;
            }
            case 'mode': {
                const mode = args[0];
                // NOTE: Should try making this dynamic or use switch case
                if (mode === 'noneOff' && ((_e = data.guildData) === null || _e === void 0 ? void 0 : _e.VarifactionMode) === 'noneOff') {
                    return message.channel.send('Setting alredy set to channel.');
                }
                else if (mode === 'chatEquation' && ((_f = data.guildData) === null || _f === void 0 ? void 0 : _f.VarifactionMode) == 'chatEquation') {
                    return message.channel.send('Setting alredy set to chatEquation.');
                }
                else if (mode === 'noneOff' && ((_g = data.guildData) === null || _g === void 0 ? void 0 : _g.VarifactionMode) !== 'noneOff') {
                    client.databaseManiger
                        .update('VarifactionMode', `"${databaseMainger_1.VarifactionModes.NONE}"`, message.guild.id)
                        .then(() => {
                        message.channel.send('Setting set noneOff');
                    })
                        .catch(e => message.channel.send(`Error updating settings: ${e.message || e}`) && console.log(e));
                }
                else if (mode === 'chatEquation' && ((_h = data.guildData) === null || _h === void 0 ? void 0 : _h.VarifactionMode) !== 'chatEquation') {
                    client.databaseManiger
                        .update('VarifactionMode', `"${databaseMainger_1.VarifactionModes.CHAT_EQUATION}"`, message.guild.id)
                        .then(() => {
                        message.channel.send('Setting set chatEquation');
                    })
                        .catch(e => message.channel.send(`Error updating settings: ${e.message || e}`) && console.log(e));
                }
                else {
                    return message.channel.send('This is not a valid type!');
                }
                break;
            }
            default: {
                message.channel.send(helpCommand);
                break;
            }
        }
    }
}
exports.default = SetChannel;
