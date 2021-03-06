export interface baselangs {
  error_occored: (error: any) => string;
  Prefix_fetched: (prefix: string) => string;
  Missing_perms: (userType: 'member' | 'client', missing_perms: string[]) => string;
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
