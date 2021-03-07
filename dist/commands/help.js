"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = __importDefault(require("../structures/BaseCommand"));
class Help extends BaseCommand_1.default {
    constructor() {
        super('help', {
            aliases: ['h'],
        });
    }
    async run(client, message, [command]) {
        var _a, _b, _c;
        if (command) {
            const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command) || '');
            return message.channel.send(`**${cmd === null || cmd === void 0 ? void 0 : cmd.name}** ${((_a = cmd === null || cmd === void 0 ? void 0 : cmd.options) === null || _a === void 0 ? void 0 : _a.aliases) && ((_b = cmd === null || cmd === void 0 ? void 0 : cmd.options) === null || _b === void 0 ? void 0 : _b.aliases.length)
                ? `\nAliases: ${cmd.options.aliases.map(a => Indent(a)).join(' ')}`
                : ''}${((_c = cmd === null || cmd === void 0 ? void 0 : cmd.options) === null || _c === void 0 ? void 0 : _c.sunCommands) ? '\n Type: SubCommands' : ''}`);
        }
        else {
            message.channel.send(`Avalable commands \`${client.commands.map(cmd => cmd.name).join(', ')}\``);
        }
    }
}
exports.default = Help;
function Indent(str) {
    return `\`${str}\``;
}
