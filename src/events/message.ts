import type { Message } from 'discord.js';
import BaseEvent from '../structures/BaseEvent';
import type { guildConfigs } from '../structures/databaseMainger';
import type verifyClient from '../structures/VerifyClient';

export interface dataCache {
  guild?: guildConfigs;
  prefix?: string;
}

export default class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client: verifyClient, message: Message) {
    if (message.author.bot) return;

    const data: dataCache = {};
    const guildData = await client.databaseManiger.get(message.guild?.id);
    if (!guildData && message.guild) await client.databaseManiger.new(message.guild.id);
    
    data.guild = guildData;
    data.prefix = guildData?.Prefix;

    const messagaArray = message.content.split(new RegExp(/s+/g));
    const command = messagaArray[0].toLowerCase();
    const args = messagaArray.slice(1);

    if (!guildData?.Prefix) return;
    if (!command.startsWith(guildData.Prefix)) return;

    const cmd = client.commands.get(command.slice(guildData.Prefix.length)) || client.commands.get(client.aliases.get(command.slice(guildData.Prefix.length)) || '');
    if (!cmd) return;
    console.log(cmd, data);
  }
}