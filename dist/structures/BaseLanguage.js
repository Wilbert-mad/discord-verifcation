"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseLanguage extends Map {
    constructor(ops) {
        super();
        this.ops = ops;
        this._LOAD();
    }
    _LOAD() {
        Object.entries(this.ops).forEach(([key, val]) => this.set(key, val));
    }
}
exports.default = BaseLanguage;
