import { Client, ClientOptions, Collection, GuildMember } from 'discord.js';
import Host from '../Utils/Host';
import { Register } from '../Utils/Register';
import type BaseCommand from './BaseCommand';
import DatabaseManiger from './databaseMainger';

export default class verifyClient extends Client {
  databaseManiger = new DatabaseManiger(this);
  private register = new Register(this);
  public commands = new Collection<string, BaseCommand>();
  public aliases = new Collection<string, string>();
  public hostApi?: Host;
  public constructor(options: ClientOptions = {}) {
    super(options);
  }

  async start(token: string, key: string) {
    await this.databaseManiger.startMain();
    this.hostApi = new Host(key, this.user?.id);
    await this.register.eventsRegister('../events');
    await this.register.commandsRegister('../commands');
    await super.login(token);
  }

  verifyMessage(message: string, member: GuildMember | null, role?: string): string {
    message = message
      .replace(/{user}/g, !member ? '**`Member not found`**' : member.nickname ?? member.user.username)
      .replace(/{server}/g, !member ? '**`Member not found`**' : member.guild.name);
    if (role && typeof role == 'string') message = message.replace(/{roles}/g, role.split(',').join(' '));
    if (role && typeof role == 'string') message = message.replace(/{role}/g, role.split(',')[0]);

    return message;
  }
}
