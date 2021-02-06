import type verifyClient from './VerifyClient';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import { join } from 'path';

export type DATABASE = sqlite.Database<sqlite3.Database, sqlite3.Statement>;
export interface guildConfigs {
  ID: string,
  ChannelId?: string,
  Roles?: string,
  AllowDM: boolean | number;
  DmMessage?: string;
  Prefix?: string;
}

export default class datbaseMainger {
  private _db: DATABASE | null = null;
  public ready = false
  constructor(public client: verifyClient) {
    this.client = client;
  }

  /**
   * Only used once to start up the manager
   * this will also set up the guildconfigs table
   */
  public async startMain(): Promise<void> {
    const db = this._db = await sqlite.open({
      filename: './database/db.sqlite',
      driver: sqlite3.Database,
      mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
    });

    (await db.prepare(`CREATE TABLE IF NOT EXISTS guildConfigs (
      ID TEXT NOT NULL PRIMARY KEY,
      ChannelId TEXT,
      Roles TEXT,
      AllowDM BOOL DEFAULT true,
      DmMessage TEXT NOT NULL DEFAULT "{user} welcome to {server} you have been given the {role}",
      Prefix TEXT DEFAULT ';'
    )`)).run();

    this.ready = true;
  }

  async get(ID?: string): Promise<guildConfigs | undefined> {
    return new Promise((resolve, reject) => {
      if (!this.db) reject(new Error('DB not open yet.'));
      this.db?.get<guildConfigs>('SELECT * FROM guildConfigs WHERE ID = ?', ID)
        .then((d) => resolve(d))
        .catch(reject);
    });
  }

  async new(ID: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) reject(new Error('DB not open yet.'));
      this.db?.exec(`INSERT INTO guildConfigs(ID) VALUES (${ID})`)
        .then(() => resolve())
        .catch(reject);
    });
  }

  async delete(ID: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) reject(new Error('DB not open yet.'));
      this.db?.exec(`DELETE FROM guildConfigs WHERE ID = ${ID}`)
        .then(() => resolve())
        .catch(reject);
    });
  }

  async migrate(configs?: sqlite.IMigrate.MigrationParams) {
    if (!this.db) return;
    await this.db.migrate({
      ...configs,
      migrationsPath: join(process.cwd(), 'database', 'migrations')
    });
  }

  get db(): DATABASE | null {
    if (!this.ready) return null;
    return this._db;
  }
}