"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class Host extends events_1.default {
    constructor(apiKey, id) {
        super();
        this.apiKey = apiKey;
        this.id = id;
        this.setMaxListeners(3);
    }
    async _APIrequest(endpont, method, body) {
        return node_fetch_1.default(`https://danbot.host/api/${endpont}`, {
            method,
            headers: {
                'content-type': 'application/json',
            },
            body: body ? JSON.stringify(body) : '',
        });
    }
    async clientInfo() {
        if (!this.id)
            return null;
        return await this._APIrequest(`/bot/${this.id}/info`, 'GET').then(d => d.json());
    }
    async post(data) {
        const dataBody = {
            id: data.clientInfo.id,
            key: this.apiKey,
            servers: data.servers,
            users: data.users,
            clientInfo: data.clientInfo,
        };
        const res = await this._APIrequest(`bot/${data.clientInfo.id}/stats`, 'POST', dataBody);
        this.emit('fetched', res);
        return new Promise((resolve, reject) => {
            try {
                if (res.status >= 500)
                    throw new Error(`DanBot Hosting server error, statusCode: ${res.status}`);
                const data = res.body;
                if (res.status === 200) {
                    // @ts-ignore-nex-line
                    if (!data.error) {
                        if (data === undefined)
                            throw new Error('Data not found');
                        this.emit('post');
                        resolve();
                    }
                }
                else if (res.status == 400) {
                    // Bad request
                    // @ts-ignore-nex-lines
                    if (res.error)
                        new Error(res.message);
                }
                else if (res.status == 429) {
                    // Rate limit hit
                    // @ts-ignore-nex-line
                    if (res.error)
                        new Error(res.message);
                }
                else {
                    throw new Error('An unknown error has occurred');
                }
            }
            catch (error) {
                this.emit('error', error);
                reject(error);
            }
        });
    }
    on() {
        return this;
    }
}
exports.default = Host;
