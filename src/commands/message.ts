import { Message, MessageEmbed } from 'discord.js';
import { dataCache } from '../events/message';
import BaseCommand from '../structures/BaseCommand';
import type verifyClient from '../structures/VerifyClient';

export default class MessageSub extends BaseCommand {
  constructor() {
    super('message', {
      aliases: ['msg', 'm'],
    });
  }

  async run(client: verifyClient, message: Message, [cmd]: string[], data: dataCache) {
    if (!message.guild) return;
    switch (cmd) {
      case 'dm':
        break;

      case 'test':
        message.channel.send(
          `Guild: ${client.verifyMessage(
            data.guildData?.Message || 'nothing found',
            message.member
          )}\n DM: ${client.verifyMessage(data.guildData?.DmMessage || 'nothing found', message.member)}`
        );
        break;

      default:
        message.channel.send(
          new MessageEmbed()
            .setAuthor(message.author.username)
            .setDescription(
              `Avalable sub commands:\n \`dm\` Dm is the message dmed to the joined member, \n\`main\` Main is the welcome channel of the server.`
            )
            .setTimestamp()
        );
        break;
    }
  }
}
