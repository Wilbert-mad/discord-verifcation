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
        sunCommands: true,
      },
      new PermissionGard(['ADMINISTRATOR'], [], { checkOwner: true })
    );
  }

  async run(client: verifyClient, message: verifyMessage, [cmd, ...args]: string[], data: dataCache) {
    if (!message.guild) return;
    const helpEmbed = new MessageEmbed()
      .setAuthor('Database command')
      .setDescription(
        `Avalable commands: \`my\` Shows the guild configs.
        e.g: \`${data.prefix}database my\`
        \`lang\` Change the languge of this guild.
        e.g: \`${data.prefix}database lang (${client.langs.join(', ')})\`
        ${client.isOwner(message.author) ? `\`get\` Gets a guild form the databases` : ''}`
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

      case 'get': {
        if (!client.isOwner(message.author)) return;
        const data = await client.databaseManiger.get(args[0]);
        if (!data) return message.send('Databese_data_not_found', args[0]);
        const embed = new MessageEmbed().setDescription(`\`\`\`json\n ${JSON.stringify(data, null, 4)} \`\`\``);
        message.channel.send(`Database data For \`${data.ID}\``, { embed });
        break;
      }

      case 'lang': {
        const lang = args[0];
        if (!client.langs.includes(lang || '')) return;
        message.channel.send('COMMAND_STILL_BEEING_DEVELOPED');
        break;
      }

      default: {
        message.channel.send(helpEmbed);
      }
    }
  }
}
