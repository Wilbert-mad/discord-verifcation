import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import BaseEvent from '../structures/BaseEvent';
import type { verifyGuild } from '../structures/discord/Guild';
import type verifyClient from '../structures/VerifyClient';

export default class guildMemberAdd extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  async run(client: verifyClient, member: GuildMember) {
    const data = await (member.guild as verifyGuild).data();
    if (!data) return;
    const welcomeChannel = member.guild.channels.cache.get(data.ChannelId || '');
    if (welcomeChannel && data.Message) {
      const welcomeEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(member.user.username)
        .setDescription(client.verifyMessage(data.Message, member, data.Roles))
        .setTimestamp();
      (welcomeChannel as TextChannel).send(welcomeEmbed).catch(_e => {});
    }
    if (data.Roles.length > 0 && data.VarifactionMode === 'noneOff') {
      const rolesArray = client.databaseManiger.parse<string>(data.Roles);
      if (!member.guild.me?.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR')) return;
      for (const role of rolesArray) member.roles.add(role).catch(_e => {});
    }
    if (data.AllowDM == 1 && data.DmMessage) {
      member.send(client.verifyMessage(data.DmMessage, member, data.Roles)).catch(_e => {});
    }
  }
}
