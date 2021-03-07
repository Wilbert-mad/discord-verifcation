"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMessage = void 0;
const discord_js_1 = require("discord.js");
class verifyMessage extends discord_js_1.Message {
    async translate(key) {
        var _a;
        const data = await this.guild.data();
        const languages = this.client.languages.get((_a = data === null || data === void 0 ? void 0 : data.Language) !== null && _a !== void 0 ? _a : 'en-us');
        const message = languages === null || languages === void 0 ? void 0 : languages.get(key);
        return message;
    }
    async send(key, ...args) {
        const message = await this.translate(key);
        if (!message)
            return this.channel.send('TRANSLATION_NOTFOUND');
        this.channel.send(message(...args));
    }
    async error(error) {
        console.log(error);
        const message = await this.translate('error_occored');
        if (!message)
            return this.reply('TRANSLATION_NOTFOUND');
        return await this.channel.send(message(error.message || error));
    }
}
exports.verifyMessage = verifyMessage;
exports.default = discord_js_1.Structures.extend('Message', () => {
    return verifyMessage;
});
