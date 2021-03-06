import type { Message } from 'discord.js';
import type { dataCache } from '../events/message';
import type PermissionGard from './permissionGard';
import type verifyClient from './VerifyClient';

export interface commandOptions {
  aliases?: string[];
  sunCommands?: boolean;
}

export default class BaseCommand {
  constructor(public name: string, public options?: commandOptions, public gard?: PermissionGard) {}

  // @ts-ignore
  public run(client: verifyClient, message: Message, args: any, data: dataCache): Promise<void> | void | any {
    throw new Error(`${this.name} dose not have a "run()" method`);
  }
}
