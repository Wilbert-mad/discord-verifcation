import { Collection, Guild, GuildMember, MessageEmbed, Role, TextChannel } from 'discord.js';
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
    if (data.Roles.length > 0) {
      // const rolesArray = client.databaseManiger.parse<string>(data.Roles);
      // const roles = this.evalRols(member.guild, rolesArray);
      // console.log(roles);
      // if (member.guild.me?.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR')) {
      //   for (const role of roles) {
      //     try {
      //       member.roles.add(role);
      //     } catch (error) {
      //       console.error(error.message || error);
      //     }
      //   }
      // }
    }
    if (data.AllowDM == 1 && data.DmMessage) {
      member.send(client.verifyMessage(data.DmMessage, member, data.Roles)).catch(_e => {});
    }
  }

  evalRols(guild: Guild, args: string[]) {
    const arg = new Set<string>(args);
    const coll = new Collection<string, Role>();
    for (const id of arg) {
      const role = guild.roles.cache.get(id);
      if (role) coll.set(role.id, role);
    }
    return coll;
  }
}
