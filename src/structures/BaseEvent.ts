import type verifyClient from './VerifyClient';
import { ClientEvents } from 'discord.js';

export default class BaseEvent {
  constructor(public name: keyof ClientEvents) {}

  // @ts-ignore
  public run(client: verifyClient, ...args: any): any {
    throw new Error(`${this.name} dose not have a "run()" method`);
  }
}
