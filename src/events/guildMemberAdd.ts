import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import BaseEvent from '../structures/BaseEvent';
import type verifyClient from '../structures/VerifyClient';

export default class guildMemberAdd extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  async run(client: verifyClient, member: GuildMember) {
    const data = await client.databaseManiger.get(member.guild.id);
    if (!data) return;
    const welcomeChannel = member.guild.channels.cache.get(data.ChannelId || '');
    if (welcomeChannel) {
      const welcomeEmbed = new MessageEmbed()
        .setAuthor(member.user.username)
        .setDescription(client.verifyMessage(data.Message ?? 'DESCRIPTION NOT FOUND', member));
      (welcomeChannel as TextChannel).send(welcomeEmbed);
    }
    if (data.AllowDM == 0 && data.DmMessage) {
      member.send(client.verifyMessage(data.DmMessage, member)).catch(_e => {});
    }
  }
}
