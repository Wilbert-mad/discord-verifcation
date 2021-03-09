import { MessageEmbed } from 'discord.js';
import BaseEvent from '../structures/BaseEvent';
import type { verifyGuild } from '../structures/discord/Guild';
import type verifyClient from '../structures/VerifyClient';

export default class GuildCreate extends BaseEvent {
  constructor() {
    super('guildCreate');
  }

  async run(client: verifyClient, guild: verifyGuild) {
    const has_database = await client.databaseManiger.has(guild.id);
    const embed = new MessageEmbed()
      .setAuthor(`[Join] ${guild.name}`)
      .setThumbnail(guild.iconURL() ?? '')
      .addFields([
        {
          name: 'ID',
          value: guild.id,
          inline: true,
        },
        {
          name: 'Members',
          value: guild.memberCount,
          inline: true,
        },
        {
          name: 'In database?',
          value: has_database ? 'YES' : 'Not found',
          inline: true,
        },
        {
          name: 'Description',
          value: guild.description ?? 'No description found.',
          inline: true,
        },
        {
          name: 'Owner',
          value: guild.ownerID,
          inline: true,
        },
      ])
      .setTimestamp();
    client.Logs.send(embed);
    client.databaseManiger.new(guild.id);
  }
}
