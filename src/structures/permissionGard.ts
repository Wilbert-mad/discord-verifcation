import type { GuildMember, PermissionString } from 'discord.js';

export interface Perms {
  client: PermissionString[];
  member: PermissionString[];
}

export default class PermissionGard {
  constructor(
    public memberPermissions: PermissionString[] = [],
    public clientPermissions: PermissionString[] = [],
    public ops: {
      checkOwner?: boolean;
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
    return {
      perms,
      clientCheck: perms.client.length > 0,
      memberCheck: perms.member.length > 0,
    };
  }
}
