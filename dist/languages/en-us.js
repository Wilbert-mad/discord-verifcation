"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseLanguage_1 = __importDefault(require("../structures/BaseLanguage"));
class EN_US extends BaseLanguage_1.default {
    constructor() {
        super({
            error_occored: error => `**An error has occored!**\`\`\`diff\n- ${error.message || error}\n\`\`\``,
            Prefix_fetched: prefix => `Prefix is set to: \`${prefix}\``,
            Missing_perms: (userType, missing_perms) => `${userType} is missing ${missing_perms.join(', ')} permission${missing_perms.length > 1 ? 's' : ''}`,
        });
    }
}
exports.default = EN_US;
