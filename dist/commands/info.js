"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const BaseCommand_1 = __importDefault(require("../structures/BaseCommand"));
class Info extends BaseCommand_1.default {
    constructor() {
        super('info');
    }
    async run(client, message) {
        const embed = new discord_js_1.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor('Information', message.author.displayAvatarURL())
            .addFields([
            {
                name: 'Guilds',
                value: client.guilds.cache.size,
                inline: true,
            },
            {
                name: 'Library',
                value: 'Discord.js',
                inline: true,
            },
            {
                name: 'Language',
                value: 'Typescript',
                inline: true,
            },
            {
                name: 'GitHub',
                value: '[GitHub Repository](https://github.com/kei-projects/discord-verifcation)',
                inline: true,
            },
            {
                name: 'Invite',
                value: '[Link](https://discord.com/oauth2/authorize?client_id=708451235195519017&scope=bot&permissions=268561472)',
                inline: true,
            },
            {
                name: 'Devs',
                value: 'Xa_puppet',
                inline: true,
            },
            {
                name: 'Trello',
                value: '[Link Here](https://trello.com/b/lnKjiDZB/discord-verifaction)',
                inline: true,
            },
        ]);
        await message.channel.send(embed);
    }
}
exports.default = Info;
