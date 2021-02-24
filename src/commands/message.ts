import { Message, MessageEmbed } from 'discord.js';
import { dataCache } from '../events/message';
import BaseCommand from '../structures/BaseCommand';
import type verifyClient from '../structures/VerifyClient';

export default class MessageSub extends BaseCommand {
  constructor() {
    super('message', {
      aliases: ['msg', 'm'],
      sunCommands: true,
    });
  }

  async run(client: verifyClient, message: Message, [cmd, ...args]: string[], data: dataCache) {
    if (!message.guild) return;
    const helpEmbed = new MessageEmbed()
      .setAuthor(message.author.username)
      .setDescription(
        `Avalable sub commands:\n \`dm\` Dm is the message dmed to the joined member.
        e.g: \`${data.prefix}message dm Hello {{user}} welcome to {{server}}\`,
        \`main\` Main is the welcome channel of the server.
        e.g: \`${data.prefix}message main Hello {{user}} welcome!\`
        \`syntax\` Shows the avalable syntax for messages.`
      )
      .setTimestamp();
    switch (cmd) {
      case 'dm': {
        const msg = args.join(' ');
        if (!msg) return message.channel.send(helpEmbed);
        await client.databaseManiger
          .update('DmMessage', msg, message.guild.id)
          .then(() =>
            message.channel.send(`DmMessage configs updated to: ${msg}. To preview up ${data.prefix}message test`)
          )
          .catch(e => message.channel.send(`There was an error trying to update dm configs: ${e.message || e}`));
        break;
      }

      case 'main': {
        const msg = args.join(' ');
        if (!msg) return message.channel.send(helpEmbed);
        await client.databaseManiger
          .update('Message', msg, message.guild.id)
          .then(() =>
            message.channel.send(`Message configs updated to: ${msg}. To preview up ${data.prefix}message test`)
          )
          .catch(e => message.channel.send(`There was an error trying to update dm configs: ${e.message || e}`));
        break;
      }

      case 'syntax': {
        message.channel.send(
          new MessageEmbed().setColor('RANDOOM').addFields([
            {
              name: '{{user}}',
              value: 'This is the emitted name of the member that joined the server.',
              inline: true,
            },
            {
              name: '{{server}}',
              value: 'The name of the server the member joined.',
              inline: true,
            },
            {
              name: '{{role}}',
              value: 'The first added role to the new member.',
              inline: true,
            },
            {
              name: '{{roles}}',
              value: 'All the roles given the the new member joined.',
              inline: true,
            },
          ])
        );
        break;
      }

      case 'test': {
        message.channel.send(
          `Guild: ${client.verifyMessage(
            data.guildData?.Message || 'nothing found',
            message.member
          )}\n DM: ${client.verifyMessage(data.guildData?.DmMessage || 'nothing found', message.member)}`
        );
        break;
      }

      default:
        message.channel.send(helpEmbed);
        break;
    }
  }
}
