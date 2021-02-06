import type { Message } from 'discord.js';
import type verifyClient from './VerifyClient';

export default class BaseCommand {
  constructor(public name: string) {}

  // @ts-ignore
  public async run(client: verifyClient, message: Message, args: string[]): Promise<void> {
    throw new Error(`${this.name} dose not have a "run()" method`);
  }
}
