import { Message } from 'discord.js';
import type { dataCache } from '../events/message';
import BaseCommand from '../structures/BaseCommand';
import { VarifactionModes } from '../structures/databaseMainger';
import type verifyClient from '../structures/VerifyClient';

export default class Verify extends BaseCommand {
  constructor() {
    super('verify');
  }

  async run(client: verifyClient, message: Message, _args: string[], data: dataCache) {
    console.log(data);
    if (data.cmd === 'verify' && message.channel.id === data.guildData?.ChannelVerifyingID) data.active = true;
    switch (data.guildData?.VarifactionMode) {
      case VarifactionModes.CHAT_EQUATION:
        if (data.active) await client.validators.equationMode(message);
        break;
    }
  }
}
