"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const BaseCommand_1 = __importDefault(require("../structures/BaseCommand"));
const BaseEvent_1 = __importDefault(require("../structures/BaseEvent"));
class Register {
    constructor(client) {
        this.client = client;
        this.client = client;
    }
    async commandsRegister(dir) {
        var _a, _b;
        const path = path_1.join(__dirname, dir);
        const paths = await fs_1.promises.readdir(path);
        for (const file of paths) {
            if (file.endsWith('.js')) {
                const { default: Command } = await Promise.resolve().then(() => __importStar(require(path_1.join(path, file))));
                const command = new Command();
                if (Command.prototype instanceof BaseCommand_1.default) {
                    this.client.commands.set(command.name, command);
                    if ((_a = command.options) === null || _a === void 0 ? void 0 : _a.aliases) {
                        (_b = command.options) === null || _b === void 0 ? void 0 : _b.aliases.forEach(a => {
                            this.client.aliases.set(a, command.name);
                        });
                    }
                }
            }
        }
    }
    async eventsRegister(dir) {
        const path = path_1.join(__dirname, dir);
        const paths = await fs_1.promises.readdir(path);
        for (const file of paths) {
            if (file.endsWith('.js')) {
                const { default: Event } = await Promise.resolve().then(() => __importStar(require(path_1.join(path, file))));
                const event = new Event();
                if (Event.prototype instanceof BaseEvent_1.default) {
                    this.client.on(event.name, event.run.bind(this, this.client));
                }
            }
        }
    }
}
exports.Register = Register;
