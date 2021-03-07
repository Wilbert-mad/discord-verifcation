"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseCommand {
    constructor(name, options, gard) {
        this.name = name;
        this.options = options;
        this.gard = gard;
    }
    // @ts-ignore
    run(client, message, args, data) {
        throw new Error(`${this.name} dose not have a "run()" method`);
    }
}
exports.default = BaseCommand;
