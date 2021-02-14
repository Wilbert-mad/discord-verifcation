import type { Message } from 'discord.js';
import BaseCommand from '../structures/BaseCommand';
import type verifyClient from '../structures/VerifyClient';

export default class SetChannel extends BaseCommand {
  constructor() {
    super('setchannel', {
      aliases: ['sch'],
    });
  }

  async run(client: verifyClient, message: Message, [IDch]: string[]) {
    if (!message.guild) return;
    const channel = message.mentions.channels.first() || message.guild?.channels.cache.get(IDch);
    if (!channel) return message.channel.send('❌ | No channel found!');
    await client.databaseManiger
      .update('ChannelId', channel.id, message.guild.id)
      .catch(e => message.channel.send(`Error updating channel: ${e.message || e}`))
      .then(() => message.channel.send(`Channel set to ${channel.toString()}`));
    console.log(await client.databaseManiger.get(message.guild.id));
  }
}
