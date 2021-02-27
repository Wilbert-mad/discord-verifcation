import BaseEvent from '../structures/BaseEvent';
import type { guildConfigs } from '../structures/databaseMainger';
import type verifyClient from '../structures/VerifyClient';
import type { verifyMessage } from '../structures/discord/Message';

export interface dataCache {
  guildData?: guildConfigs;
  prefix?: string | null;
  active?: boolean;
  cmd?: string;
}

export default class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client: verifyClient, message: verifyMessage) {
    if (message.author.bot) return;

    const data: dataCache = {};
    if (message.guild) {
      const guildData = await client.databaseManiger.get(message.guild?.id);
      if (!guildData && message.guild) await client.databaseManiger.new(message.guild.id);

      data.guildData = guildData;
      data.prefix = guildData?.Prefix;
    }

    const messagaArray = message.content.split(/ +/g);
    const command = messagaArray[0].toLowerCase();
    const args = messagaArray.slice(1);

    if (!data.prefix) return;
    if (new RegExp(`<@!${client.user!.id}>`).test(command)) return message.send('Prefix_fetched', data.prefix);
    if (!command.startsWith(data.prefix)) return;
    if (command.slice(data.prefix.length) === 'guildmemberadd' && message.member)
      return client.emit('guildMemberAdd', message.member);

    const cmd =
      client.commands.get(command.slice(data.prefix.length)) ||
      client.commands.get(client.aliases.get(command.slice(data.prefix.length)) || '');

    if (!cmd) return;
    data.cmd = cmd.name;

    if (cmd) {
      try {
        await cmd.run(client, message, args, data);
      } catch (error) {
        message.error(error);
      }
    }
  }
}
