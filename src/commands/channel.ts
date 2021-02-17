import { Message, MessageEmbed } from 'discord.js';
import type { dataCache } from '../events/message';
import BaseCommand from '../structures/BaseCommand';
import type verifyClient from '../structures/VerifyClient';

export default class SetChannel extends BaseCommand {
  constructor() {
    super('channel', {
      aliases: ['ch'],
      sunCommands: true,
    });
  }

  async run(client: verifyClient, message: Message, [cmd, ...args]: string[], data: dataCache) {
    if (!message.guild) return;
    const helpCommand = new MessageEmbed().setAuthor('Channel sub Commands')
      .setDescription(`Avalable sub commands:\n \`welcome\` Sets the welcome channel.
      e.g: \`${data.prefix}channel welcome #welcome-channel\`
      `);

    switch (cmd) {
      case 'welcome': {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send('❌ | Channel not found!');
        await client.databaseManiger
          .update('ChannelId', channel.id, message.guild.id)
          .then(() => message.channel.send(`Channel set to ${channel.toString()}`))
          .catch(e => message.channel.send(`Error updating channel: ${e.message || e}`));
        break;
      }

      default: {
        message.channel.send(helpCommand);
        break;
      }
    }
  }
}
