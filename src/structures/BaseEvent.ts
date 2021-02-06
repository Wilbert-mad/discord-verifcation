import type verifyClient from './VerifyClient';

export default class BaseEvent {
  constructor(public name: string) {}

  // @ts-ignore
  public run(client: verifyClient, ...args: any): Promise<void> {
    throw new Error(`${this.name} dose not have a "run()" method`);
  }
}