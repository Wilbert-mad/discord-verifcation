export interface baselangs {
  error_occored: (error: any) => string;
  Prefix_fetched: (prefix: string) => string;
  Databese_data_not_found: (id: string) => string;
  Missing_perms: (missing_perms: string[]) => string;
}

export default class BaseLanguage extends Map<string, Function> {
  constructor(public ops: baselangs) {
    super();
    this._LOAD();
  }

  private _LOAD() {
    Object.entries(this.ops).forEach(([key, val]) => this.set(key, val));
  }
}
