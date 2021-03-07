"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseEvent {
    constructor(name) {
        this.name = name;
    }
    // @ts-ignore
    run(client, ...args) {
        throw new Error(`${this.name} dose not have a "run()" method`);
    }
}
exports.default = BaseEvent;
