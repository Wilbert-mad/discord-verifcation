import { MessageEmbed } from 'discord.js';
import BaseEvent from '../structures/BaseEvent';
import type { verifyGuild } from '../structures/discord/Guild';
import type verifyClient from '../structures/VerifyClient';

export default class GuildDelete extends BaseEvent {
  constructor() {
    super('guildDelete');
  }

  async run(client: verifyClient, guild: verifyGuild) {
    const embed = new MessageEmbed()
      .setAuthor(`[Left] ${guild.name}`)
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
  }
}
