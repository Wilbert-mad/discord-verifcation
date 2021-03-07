"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("./configs");
require("./structures/discord");
const VerifyClient_1 = __importDefault(require("./structures/VerifyClient"));
const client = new VerifyClient_1.default();
(async () => {
    await client.start(configs_1.TOKEN, configs_1.KEY);
})();
