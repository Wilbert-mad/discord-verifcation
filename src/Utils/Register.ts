import type verifyClient from '../structures/VerifyClient';
import { promises as fs } from 'fs';
import { join } from 'path';
import BaseCommand from '../structures/BaseCommand';
import BaseEvent from '../structures/BaseEvent';

export class Register {
  constructor(private client: verifyClient) {
    this.client = client;
  }

  async commandsRegister(dir: string) {
    const path = join(__dirname, dir)
    const paths = await fs.readdir(path);
    for (const file of paths) {
      if (file.endsWith('.js')) {
        const { default: Command } = await import(join(path, file));
        const command = new Command();
        if (Command.prototype instanceof BaseCommand) {
          this.client.commands.set(command.name, command);
        }
      }
    }
  }

  async eventsRegister(dir: string) {
    const path = join(__dirname, dir)
    const paths = await fs.readdir(path);
    for (const file of paths) {
      if (file.endsWith('.js')) {
        const { default: Event } = await import(join(path, file));
        const event = new Event();
        if (Event.prototype instanceof BaseEvent) {
          this.client.on(event.name, event.run.bind(this, this.client));
        }
      }
    }
  }
}
