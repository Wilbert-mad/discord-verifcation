type function_ = (...args: any) => string;
export default class BaseLanguage extends Map<string, string | function_> {
  constructor(
    public ops: {
      [key: string]: string | function_;
    }
  ) {
    super();
    this._LOG();
  }

  private _LOG() {
    Object.entries(this.ops).forEach(([key, val]) => this.set(key, val));
  }
}
