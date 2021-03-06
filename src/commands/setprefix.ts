import type { dataCache } from '../events/message';
import BaseCommand from '../structures/BaseCommand';
import type { verifyMessage } from '../structures/discord/Message';
import PermissionGard from '../structures/permissionGard';
import type verifyClient from '../structures/VerifyClient';

export default class SetPrefix extends BaseCommand {
  constructor() {
    super('setprefix', {}, new PermissionGard(['MANAGE_GUILD' || 'ADMINISTRATOR'], [], { checkOwner: true }));
  }

  async run(client: verifyClient, message: verifyMessage, [newPrefix]: string[], data: dataCache) {
    if (!message.guild) return;
    if (!newPrefix) return message.channel.send('Prefix was not provided!!?');
    if (newPrefix === data.prefix) return message.channel.send(`\`${newPrefix}\` has alreay be set as the prefix.`);
    await client.databaseManiger
      .update('Prefix', `"${newPrefix}"`, message.guild.id)
      .then(() => message.channel.send(`**Prefix has be updated to \`${newPrefix}\`**`))
      .catch(e => message.error(e));
  }
}
