import type datbaseMainger from './databaseMainger';

export interface GuildBanData {
  /**
   * ID of the guild/server
   */
  ID: string;
  /**
   * The reason this guild was ban
   */
  REASON: string;
  /**
   * If there ban was lifted but this will not remove there records
   */
  BanStatus: boolean;
  /**
   * The amount of warns this guild has gotten
   */
  Warns: number;
}

export default class GuildBanManager {
  private _cache = new Map<string, GuildBanData | undefined>();
  constructor(private manager: datbaseMainger) {}

  async get(ID: string, force: boolean = false): Promise<GuildBanData | undefined> {
    return new Promise((resolve, reject) => {
      if (!this.manager.db) reject(new Error('DB not open yet.'));
      if (!force && this._cache.has(ID)) return resolve(this._cache.get(ID));
      this.manager.db
        ?.get<GuildBanData>('SELECT * FROM BanGuilds WHERE ID = ?', ID)
        .then(d => {
          d && this._cache.set(ID, d);
          return resolve(d);
        })
        .catch(reject);
    });
  }

  async all(force: boolean = false): Promise<GuildBanData[]> {
    return new Promise((resolve, reject) => {
      if (!this.manager.db) reject(new Error('DB not open yet.'));
      this.manager.db
        ?.get<GuildBanData[]>('SELECT * FROM BanGuilds')
        .then(d => {
          if (d && force) {
            for (const guild of d) this._cache.set(guild.ID, guild);
          }
          return resolve(d ?? []);
        })
        .catch(reject);
    });
  }

  async has(id: string): Promise<boolean> {
    return this._cache.has(id) === true ?? !!(await this.get(id));
  }

  async newban(data: { ID: string; REASON: string }): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.manager.db) reject(new Error('DB not open yet.'));
      if (await this.has(data.ID)) return resolve();
      this.manager.db
        ?.exec(`INSERT INTO BanGuilds VALUES (${data.ID}, "${data.REASON}")`)
        .then(() => resolve())
        .catch(reject);
    });
  }
}
