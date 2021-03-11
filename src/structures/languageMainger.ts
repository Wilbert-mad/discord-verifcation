import fs from 'fs';
import path from 'path';
import type BaseLanguage from './BaseLanguage';

export type languages = 'en-us' | 'es-ES';

export class LaguageMainger {
  _cache = new Map<string, BaseLanguage>();
  all: string[] = [];
  constructor() {
    this.register();
  }

  get(key: languages) {
    return this._cache.get(key);
  }

  private register() {
    const files = fs.readdirSync(path.join(__dirname, '..', 'languages'));
    files
      .filter(f => f.endsWith('.js'))
      .forEach(f => {
        const { default: lan } = require(path.join(__dirname, '..', 'languages', f));
        const language: BaseLanguage = new lan();
        this.all.push(f.split('.js')[0]);
        this._cache.set(f.split('.js')[0], language);
      });
  }
}
