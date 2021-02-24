import type { Message } from 'discord.js';
import type { dataCache } from '../events/message';
import BaseCommand from '../structures/BaseCommand';
import { VarifactionModes } from '../structures/databaseMainger';
import type verifyClient from '../structures/VerifyClient';

export default class Verify extends BaseCommand {
  constructor() {
    super('verify');
  }

  async run(client: verifyClient, message: Message, _args: string[], data: dataCache) {
    if (!message.guild || !message.member) return;
    if (message.channel.id === data.guildData?.ChannelVerifyingID) data.active = true;
    switch (data.guildData?.VarifactionMode) {
      case VarifactionModes.CHAT_EQUATION:
        if (!data.active) return;
        const res = await client.validators.equationMode(message);
        if (res) {
          const rolesArray = client.databaseManiger.parse<string>(data.guildData.Roles);
          if (!message.member.guild.me?.hasPermission('MANAGE_ROLES' || 'ADMINISTRATOR')) return;
          for (const role of rolesArray) message.member.roles.add(role).catch(_e => {});
        }
        break;
    }
  }
}
