"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = __importDefault(require("../structures/BaseCommand"));
class Ping extends BaseCommand_1.default {
    constructor() {
        super('ping');
    }
    async run(_client, message) {
        const statTime = Date.now();
        await message.channel.send('pinging...').then(msg => {
            const endTime = Date.now();
            msg.edit(`Pong. \`${endTime - statTime}ms\``);
        });
    }
}
exports.default = Ping;
