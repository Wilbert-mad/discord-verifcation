"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEvent_1 = __importDefault(require("../structures/BaseEvent"));
class Ready extends BaseEvent_1.default {
    constructor() {
        super('ready');
    }
    async run(client) {
        var _a, _b, _c, _d;
        console.log(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.username} is ready`);
        (_b = client.user) === null || _b === void 0 ? void 0 : _b.setPresence({ activity: { name: ';help' } });
        console.log('GuildConfigs retreved loaded servers: ', (_d = (await ((_c = client.databaseManiger.db) === null || _c === void 0 ? void 0 : _c.all('SELECT ID FROM guildConfigs')))) === null || _d === void 0 ? void 0 : _d.length);
    }
}
exports.default = Ready;
