import { Client, ClientOptions, Collection, GuildMember } from 'discord.js';
import Host from '../Utils/Host';
import { Register } from '../Utils/Register';
import { ValidationModeManger } from '../Utils/VarifactionModes';
import type BaseCommand from './BaseCommand';
import DatabaseManiger from './databaseMainger';
import { LaguageMainger } from './languageMainger';
import mustach from 'mustache';

export default class verifyClient extends Client {
  public databaseManiger = new DatabaseManiger(this);
  private register = new Register(this);
  public commands = new Collection<string, BaseCommand>();
  public aliases = new Collection<string, string>();
  public languages = new LaguageMainger();
  public validators = new ValidationModeManger();
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
    try {
      message = mustach
        .render(message, {
          user: !member ? '**`Member not found`**' : member.nickname ?? member.user.username,
          server: !member ? '**`Member not found`**' : member.guild.name,
          roles: role ? role.split(',').join(' ') : '**`Roles not set`**',
          role: role ? role.split(',')[0] : '**`Roles not set`**',
        })
        .replace(/&#x60;/g, '`')
        .replace(/&#x3D;/g, '=')
        .replace(/&#x2F;/g, '/')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&');
    } catch (error) {
      message = error.message || error;
    }
    return message;
  }
}
