import type { Message } from 'discord.js';
import type verifyClient from './VerifyClient';

export interface commandOptions {
  aliases: string[];
}

export default class BaseCommand {
  constructor(public name: string, public options?: commandOptions) {}

  // @ts-ignore
  public run(client: verifyClient, message: Message, args: string[]): Promise<void> {
    throw new Error(`${this.name} dose not have a "run()" method`);
  }
}
