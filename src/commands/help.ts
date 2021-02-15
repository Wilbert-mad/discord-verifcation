import type { Message } from 'discord.js';
import BaseCommand from '../structures/BaseCommand';
import type verifyClient from '../structures/VerifyClient';

export default class Help extends BaseCommand {
  constructor() {
    super('help', {
      aliases: ['h'],
    });
  }

  async run(client: verifyClient, message: Message, [command]: string[]) {
    if (command) {
      const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command) || '');
      return message.channel.send(
        `**${cmd?.name}** ${
          cmd?.options?.aliases && cmd?.options?.aliases.length
            ? `\nAliases: ${cmd.options.aliases.map(a => Indent(a)).join(' ')}`
            : ''
        }${cmd?.options?.sunCommands ? '\n Type: SubCommands' : ''}`
      );
    } else {
      message.channel.send(`Avalable commands \`${client.commands.map(cmd => cmd.name).join(', ')}\``);
    }
  }
}

function Indent(str: string) {
  return `\`${str}\``;
}
