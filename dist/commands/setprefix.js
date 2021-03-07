"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = __importDefault(require("../structures/BaseCommand"));
const permissionGard_1 = __importDefault(require("../structures/permissionGard"));
class SetPrefix extends BaseCommand_1.default {
    constructor() {
        super('setprefix', {}, new permissionGard_1.default(['MANAGE_GUILD' || 'ADMINISTRATOR'], [], { checkOwner: true }));
    }
    async run(client, message, [newPrefix], data) {
        if (!message.guild)
            return;
        if (!newPrefix)
            return message.channel.send('Prefix was not provided!!?');
        if (newPrefix === data.prefix)
            return message.channel.send(`\`${newPrefix}\` has alreay be set as the prefix.`);
        await client.databaseManiger
            .update('Prefix', `"${newPrefix}"`, message.guild.id)
            .then(() => message.channel.send(`**Prefix has be updated to \`${newPrefix}\`**`))
            .catch(e => message.error(e));
    }
}
exports.default = SetPrefix;
