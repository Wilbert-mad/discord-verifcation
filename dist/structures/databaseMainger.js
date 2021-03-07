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
exports.VarifactionModes = void 0;
const sqlite = __importStar(require("sqlite"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = require("path");
var VarifactionModes;
(function (VarifactionModes) {
    /**
     * Used on the server set channel the member must
     * varify by typing `varify` command and solving the equation
     */
    VarifactionModes["CHAT_EQUATION"] = "chatEquation";
    /**
     * Right no join will dm a member and ask you to
     * varify by typing `varify` command and solving the equation
     * if not solved in time default to chat equation
     */
    VarifactionModes["DM_EQUATION"] = "DmEquation";
    /**
     * default varifactionMode, just gives a memeber a role on join if any
     */
    VarifactionModes["NONE"] = "noneOff";
})(VarifactionModes = exports.VarifactionModes || (exports.VarifactionModes = {}));
class datbaseMainger {
    constructor(client) {
        this.client = client;
        this._db = null;
        this.ready = false;
        this._cache = new Map();
        this.client = client;
    }
    /**
     * Only used once to start up the manager
     * this will also set up the guildconfigs table
     */
    async startMain() {
        const db = (this._db = await sqlite.open({
            filename: path_1.join(process.cwd(), 'database', 'db.sqlite'),
            driver: sqlite3_1.default.Database,
            mode: sqlite3_1.default.OPEN_READWRITE | sqlite3_1.default.OPEN_CREATE,
        }));
        await db.migrate({
            migrationsPath: path_1.join(process.cwd(), 'database', 'migrations'),
        });
        this.ready = true;
    }
    async get(ID, force = false) {
        return new Promise((resolve, reject) => {
            var _a;
            if (!this.db)
                reject(new Error('DB not open yet.'));
            if (!force && this._cache.has(ID))
                return resolve(this._cache.get(ID));
            (_a = this.db) === null || _a === void 0 ? void 0 : _a.get('SELECT * FROM guildConfigs WHERE ID = ?', ID).then(d => {
                d && this._cache.set(ID, d);
                return resolve(d);
            }).catch(reject);
        });
    }
    async push(key, added, id) {
        return new Promise(async (resolve, reject) => {
            if (!this.db)
                reject(new Error('DB not open yet.'));
            let data1 = this._cache.get(id) || (await this.get(id));
            if (!data1)
                return resolve(null);
            let data = data1[key];
            // if data id not found set it to emty string
            if (data == undefined || data == null)
                await this.update(key, '""', id).catch(reject);
            // data checks
            // if (typeof data === 'string' && data.length < 0) reject(new Error('DATA must be string and parseibl.'));
            if (typeof data !== 'string')
                return reject(new Error(`DATA must be string and parseibl. Invalid: ${typeof data}`));
            data = this.parse(data);
            // reslove if data includes on of the roles
            // for (const d of added) {
            //   if (data && data.toString().split(',').includes(d)) return resolve(new Set(data as T[]));
            // }
            // check the length of data and added of one is `0` then return `null`
            if (added.length < 0 || (data && data.length < 0))
                return resolve(null);
            // add `added` to a set to filter repets
            const set = new Set(data);
            for (const i of added) {
                if (!set.has(i))
                    set.add(i);
            }
            // update data
            await this.update(key, `"${this.toArray(set)}"`, id).catch(reject);
            resolve(set);
        });
    }
    parse(value, seperator = ',') {
        if (typeof value !== 'string')
            return [];
        const t = value.replace(/\s/g, '').split(seperator);
        const e = [];
        if (t[0].charAt(0) === '{') {
            for (const el of t) {
                try {
                    e.push(JSON.parse(el));
                }
                catch (error) { }
            }
        }
        return e.length > 0 ? e : t.filter(e => e.length > 0 && e);
    }
    /**
     * turn the set to array
     */
    toArray(s) {
        const arr = [];
        s.forEach(e => arr.push(e));
        return arr;
    }
    async update(key, val, id) {
        return new Promise((resolve, reject) => {
            var _a;
            if (!this.db)
                reject(new Error('DB not open yet.'));
            this._cache.delete(id);
            (_a = this.db) === null || _a === void 0 ? void 0 : _a.exec(`UPDATE guildConfigs SET ${key} = ${val} WHERE ID = ${id}`).then(() => resolve()).catch(reject);
        });
    }
    async new(ID) {
        return new Promise((resolve, reject) => {
            var _a;
            if (!this.db)
                reject(new Error('DB not open yet.'));
            (_a = this.db) === null || _a === void 0 ? void 0 : _a.exec(`INSERT INTO guildConfigs(ID) VALUES (${ID})`).then(() => resolve()).catch(reject);
        });
    }
    async delete(ID) {
        return new Promise((resolve, reject) => {
            var _a;
            if (!this.db)
                reject(new Error('DB not open yet.'));
            this._cache.delete(ID);
            (_a = this.db) === null || _a === void 0 ? void 0 : _a.exec(`DELETE FROM guildConfigs WHERE ID = ${ID}`).then(() => resolve()).catch(reject);
        });
    }
    get db() {
        if (!this.ready)
            return null;
        return this._db;
    }
}
exports.default = datbaseMainger;
