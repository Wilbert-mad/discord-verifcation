"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaguageMainger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class LaguageMainger {
    constructor() {
        this._cache = new Map();
        this.register();
    }
    get(key) {
        return this._cache.get(key);
    }
    register() {
        const files = fs_1.default.readdirSync(path_1.default.join(__dirname, '..', 'languages'));
        files
            .filter(f => f.endsWith('.js'))
            .forEach(f => {
            const { default: lan } = require(path_1.default.join(__dirname, '..', 'languages', f));
            const language = new lan();
            this._cache.set(f.split('.js')[0], language);
        });
    }
}
exports.LaguageMainger = LaguageMainger;
