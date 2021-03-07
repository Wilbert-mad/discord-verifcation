"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const BaseCommand_1 = __importDefault(require("../structures/BaseCommand"));
const permissionGard_1 = __importDefault(require("../structures/permissionGard"));
class Database extends BaseCommand_1.default {
    constructor() {
        super('database', {
            aliases: ['db'],
        }, new permissionGard_1.default(['ADMINISTRATOR'], [], { checkOwner: true }));
    }
    async run(client, message, [cmd], data) {
        if (!message.guild)
            return;
        const helpEmbed = new discord_js_1.MessageEmbed()
            .setAuthor('Database command')
            .setDescription(`Avalable commands: \`my\` Shows the guild configs.
        e.g: \`${data.prefix}database my\``)
            .setTimestamp();
        switch (cmd) {
            case 'my': {
                client.databaseManiger
                    .get(message.guild.id)
                    .then(d => {
                    var _a;
                    message.channel.send((_a = JSON.stringify(d, null, 4)) !== null && _a !== void 0 ? _a : 'Database not found!', { code: 'json' });
                })
                    .catch(e => message.error(e));
                break;
            }
            default: {
                message.channel.send(helpEmbed);
            }
        }
    }
}
exports.default = Database;
