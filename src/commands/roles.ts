import { Collection, Guild, MessageEmbed, Role } from 'discord.js';
import type { dataCache } from '../events/message';
import BaseCommand from '../structures/BaseCommand';
import type { verifyMessage } from '../structures/discord/Message';
import PermissionGard from '../structures/permissionGard';
import type verifyClient from '../structures/VerifyClient';

export default class Roles extends BaseCommand {
  constructor() {
    super(
      'roles',
      {
        sunCommands: true,
      },
      new PermissionGard(['MANAGE_GUILD' || 'ADMINISTRATOR'], [], { checkOwner: true })
    );
  }

  async run(client: verifyClient, message: verifyMessage, [cmd, ...args]: string[], data: dataCache) {
    if (!message.guild) return;
    const roles = message.mentions.roles.size > 0 ? message.mentions.roles : this.evalRolsArgs(message.guild, args);
    const ids = roles.map(r => r.id);
    const helpEmbed = new MessageEmbed()
      .setAuthor(message.author.username)
      .setDescription(
        `Avalable sub commands:\n \`add\` Adds a new role (roleID) to the server configs.
        e.g: \`${data.prefix}roles add 270947823098 @role\`,
        \`view\` Shows all the set roles (roleIDs).
        \`e.g: ${data.prefix}roles view\`
        \`remove\` Removes a role already set in the roles settings.
        e.g: \`${data.prefix}roles remove (270947823598|@role)\``
      )
      .setTimestamp();

    switch (cmd) {
      case 'add': {
        if (ids.length <= 0) return message.channel.send('Roles are required argument!');
        client.databaseManiger
          .push('Roles', ids, message.guild.id)
          .then(d => {
            if (d == null) return message.channel.send('There was an error updating you role');
            return message.channel.send(`Roles updated cache set; \`${client.databaseManiger.toArray(d).join(', ')}\``);
          })
          .catch(e => console.log(e));
        break;
      }

      case 'remove': {
        if (ids.length <= 0) return message.channel.send('Roles are required argument!');
        const rolesParsed = client.databaseManiger.parse<string>(data.guildData!.Roles);
        const set = new Set<string>();
        for (const i of rolesParsed) if (!set.has(i)) set.add(i);
        if (!ids[0]) return message.channel.send('This is a invalid role!');
        set.delete(ids[0]);
        const d = client.databaseManiger.toArray(set);
        client.databaseManiger
          .update<string>('Roles', `"${d}"`, message.guild.id)
          .then(() => {
            return message.channel.send(`Roles updated.`);
          })
          .catch(e => console.log(e));
        break;
      }

      case 'view': {
        client.databaseManiger
          .get(message.guild.id)
          .then(d => {
            if (!d) return message.channel.send('Could not find guild data.');
            return message.channel.send(`Roles cache; ${d.Roles}`);
          })
          .catch(e => console.log(e));
        break;
      }
      default: {
        message.channel.send(helpEmbed);
        break;
      }
    }
  }

  evalRolsArgs(guild: Guild, args: string[]) {
    const arg = new Set<string>(args);
    const coll = new Collection<string, Role>();
    for (const id of arg) {
      const role = guild.roles.cache.get(id);
      if (role) coll.set(role.id, role);
    }
    return coll;
  }
}
