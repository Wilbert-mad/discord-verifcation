import { Client, ClientOptions, Collection } from 'discord.js';
import { Register } from '../Utils/Register';
import type BaseCommand from './BaseCommand';
import DatabaseManiger from './databaseMainger';

export default class verifyClient extends Client {
  databaseManiger = new DatabaseManiger(this);
  private register = new Register(this);
  public commands = new Collection<string, BaseCommand>();
  public constructor(options: ClientOptions = {}) {
    super(options);
  }

  async start(token: string) {
    await this.databaseManiger.startMain();
    await this.register.eventsRegister('../events');
    await this.register.commandsRegister('../commands');
    await super.login(token);
  }
}