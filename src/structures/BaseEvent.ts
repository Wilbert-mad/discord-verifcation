export default class BaseEvent {
  constructor(public name: string) {}

  // @ts-ignore
  public async run(client: verifyClient): Promise<void> {
    throw new Error(`${this.name} dose not have a "run()" method`);
  }
}