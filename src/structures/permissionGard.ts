import type { GuildMember, PermissionString } from 'discord.js';
import type verifyClient from './VerifyClient';

type MemberStringPermissions =
  | 'CREATE_INSTANT_INVITE'
  | 'KICK_MEMBERS'
  | 'BAN_MEMBERS'
  | 'ADMINISTRATOR'
  | 'MANAGE_CHANNELS'
  | 'MANAGE_GUILD'
  | 'ADD_REACTIONS'
  | 'VIEW_AUDIT_LOG'
  | 'PRIORITY_SPEAKER'
  | 'STREAM'
  | 'VIEW_CHANNEL'
  | 'SEND_MESSAGES'
  | 'SEND_TTS_MESSAGES'
  | 'MANAGE_MESSAGES'
  | 'EMBED_LINKS'
  | 'ATTACH_FILES'
  | 'READ_MESSAGE_HISTORY'
  | 'MENTION_EVERYONE'
  | 'USE_EXTERNAL_EMOJIS'
  | 'VIEW_GUILD_INSIGHTS'
  | 'CONNECT'
  | 'SPEAK'
  | 'MUTE_MEMBERS'
  | 'DEAFEN_MEMBERS'
  | 'MOVE_MEMBERS'
  | 'USE_VAD'
  | 'CHANGE_NICKNAME'
  | 'MANAGE_NICKNAMES'
  | 'MANAGE_ROLES'
  | 'MANAGE_WEBHOOKS'
  | 'MANAGE_EMOJIS'
  | 'BOT_OWNER';

export interface Perms {
  client: PermissionString[];
  member: MemberStringPermissions[];
}

export default class PermissionGard {
  constructor(
    public memberPermissions: PermissionString[] = [],
    public clientPermissions: PermissionString[] = [],
    public ops: {
      checkOwner?: boolean;
      botOwners?: boolean;
    } = {}
  ) {}

  check(member: GuildMember) {
    const perms: Perms = {
      client: [],
      member: [],
    };

    for (const perm of this.memberPermissions) {
      if (this.ops.checkOwner && member.guild.ownerID === member.user.id) {
        perms.member = [];
        break;
      }
      if (!member.permissions.toArray().includes(perm)) perms.member.push(perm);
    }
    for (const perm of this.clientPermissions) {
      if (!member.guild.me?.permissions.toArray().includes(perm)) perms.client.push(perm);
    }

    if (this.ops.botOwners && !(member.client as verifyClient).isOwner(member.user)) {
      perms.member = ['BOT_OWNER'];
    }

    return {
      perms,
      clientCheck: perms.client.length > 0,
      memberCheck: perms.member.length > 0,
    };
  }
}
