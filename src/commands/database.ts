import { MessageEmbed } from 'discord.js';
import { dataCache } from '../events/message';
import BaseCommand from '../structures/BaseCommand';
import type { verifyMessage } from '../structures/discord/Message';
import PermissionGard from '../structures/permissionGard';
import type verifyClient from '../structures/VerifyClient';

export default class Database extends BaseCommand {
  constructor() {
    super(
      'database',
      {
        aliases: ['db'],
      },
      new PermissionGard(['ADMINISTRATOR'], [], { checkOwner: true })
    );
  }

  async run(client: verifyClient, message: verifyMessage, [cmd]: string[], data: dataCache) {
    if (!message.guild) return;
    const helpEmbed = new MessageEmbed()
      .setAuthor('Database command')
      .setDescription(
        `Avalable commands: \`my\` Shows the guild configs.
        e.g: \`${data.prefix}database my\``
      )
      .setTimestamp();

    switch (cmd) {
      case 'my': {
        client.databaseManiger
          .get(message.guild.id)
          .then(d => {
            message.channel.send(JSON.stringify(d, null, 4) ?? 'Database not found!', { code: 'json' });
          })
          .catch(e => message.error(e));
        break;
      }

      default: {
        message.channel.send(helpEmbed);
      }
    }
  }
}
