import type { Message } from 'discord.js';
import type { dataCache } from '../events/message';
import BaseCommand from '../structures/BaseCommand';
import { VarifactionModes } from '../structures/databaseMainger';
import type verifyClient from '../structures/VerifyClient';
import { MessageSafe } from '../../Custom/dist';

export default class Verify extends BaseCommand {
  constructor() {
    super('verify');
  }

  async run(client: verifyClient, message: Message, _args: string[], data: dataCache) {
    if (!message.guild || !message.member) return;
    if (message.channel.id === data.guildData?.ChannelVerifyingID) data.active = true;
    // validate roles
    const rolesArray = client.databaseManiger.parse<string>(data.guildData!.Roles || '');
    for (const id of rolesArray) if (message.member.roles.cache.map(r => r.id).includes(id)) return;

    const safe = new MessageSafe(message);

    switch (data.guildData?.VarifactionMode) {
      case VarifactionModes.CHAT_EQUATION:
        if (!data.active) return;
        const res = await client.validators.equationMode(safe);
        if (res) {
          if (!message.member.guild.me?.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR')) return;
          for (const role of rolesArray) message.member.roles.add(role).catch(_e => {});
        }
        break;
    }
  }
}
