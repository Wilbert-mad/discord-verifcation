"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Host_1 = __importDefault(require("../Utils/Host"));
const Register_1 = require("../Utils/Register");
const VarifactionModes_1 = require("../Utils/VarifactionModes");
const databaseMainger_1 = __importDefault(require("./databaseMainger"));
const languageMainger_1 = require("./languageMainger");
const mustache_1 = __importDefault(require("mustache"));
class verifyClient extends discord_js_1.Client {
    constructor(options = {}) {
        super(options);
        this.databaseManiger = new databaseMainger_1.default(this);
        this.register = new Register_1.Register(this);
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.languages = new languageMainger_1.LaguageMainger();
        this.validators = new VarifactionModes_1.ValidationModeManger();
    }
    async start(token, key) {
        var _a;
        await this.databaseManiger.startMain();
        this.hostApi = new Host_1.default(key, (_a = this.user) === null || _a === void 0 ? void 0 : _a.id);
        await this.register.eventsRegister('../events');
        await this.register.commandsRegister('../commands');
        await super.login(token);
    }
    verifyMessage(message, member, role) {
        var _a;
        try {
            message = mustache_1.default
                .render(message, {
                user: !member ? '**`Member not found`**' : (_a = member.nickname) !== null && _a !== void 0 ? _a : member.user.username,
                server: !member ? '**`Member not found`**' : member.guild.name,
                roles: role ? role.split(',').join(' ') : '**`Roles not set`**',
                role: role ? role.split(',')[0] : '**`Roles not set`**',
            })
                .replace(/&#x60;/g, '`')
                .replace(/&#x3D;/g, '=')
                .replace(/&#x2F;/g, '/')
                .replace(/&#39;/g, "'")
                .replace(/&quot;/g, '"')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .replace(/&amp;/g, '&');
        }
        catch (error) {
            message = error.message || error;
        }
        return message;
    }
}
exports.default = verifyClient;
