"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGuild = void 0;
const discord_js_1 = require("discord.js");
class verifyGuild extends discord_js_1.Guild {
    async data() {
        return this.client.databaseManiger.get(this.id);
    }
    async languge() {
        return this.data().then(d => d === null || d === void 0 ? void 0 : d.Language);
    }
}
exports.verifyGuild = verifyGuild;
exports.default = discord_js_1.Structures.extend('Guild', () => {
    return verifyGuild;
});
