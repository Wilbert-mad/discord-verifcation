import { Message, MessageEmbed } from 'discord.js';
import type { dataCache } from '../events/message';
import BaseCommand from '../structures/BaseCommand';
import { VarifactionModes } from '../structures/databaseMainger';
import PermissionGard from '../structures/permissionGard';
import type verifyClient from '../structures/VerifyClient';

export default class SetChannel extends BaseCommand {
  constructor() {
    super(
      'channel',
      {
        aliases: ['ch'],
        sunCommands: true,
      },
      new PermissionGard(['MANAGE_GUILD' || 'ADMINISTRATOR'], [], { checkOwner: true })
    );
  }

  async run(client: verifyClient, message: Message, [cmd, ...args]: string[], data: dataCache) {
    if (!message.guild) return;
    const helpCommand = new MessageEmbed()
      .setAuthor('Channel sub Commands')
      .setDescription(
        `Avalable sub commands:\n \`welcome\` Sets the welcome channel.
        e.g: \`${data.prefix}channel welcome #welcome-channel\`
        \`dm\` Whether to dm the member on join.
        e.g: \`${data.prefix}channel dm (yes|no)\`
        \`dav\` Whether to delete a message from verification channel 
        after use or if its not a valid varifaction message (bot, spam).
        e.g: \`${data.prefix}channel dav (yes|no)\`
        \`verify\` Sets the verifying channel.
        e.g: \`${data.prefix}channel verify #channel \`
        \`mode\` Sets the mode in which a member is varifyed
        e.g: \`${data.prefix}channel mode (${VarifactionModes.CHAT_EQUATION}|${VarifactionModes.NONE})\``
      )
      .setTimestamp();

    switch (cmd) {
      case 'welcome': {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send('❌ | Channel not found!');
        await client.databaseManiger
          .update('ChannelId', channel.id, message.guild.id)
          .then(() => message.channel.send(`Channel set to ${channel.toString()}`))
          .catch(e => message.channel.send(`Error updating channel: ${e.message || e}`));
        break;
      }

      case 'dm': {
        const res: 'yes' | 'no' = args[0] as 'yes' | 'no';
        if (res === 'yes' && data.guildData?.AllowDM === 1) {
          return message.channel.send('Setting alredy set to yes.');
        } else if (res === 'no' && data.guildData?.AllowDM === 0) {
          return message.channel.send('Setting alredy set to no.');
        } else if (res === 'no') {
          client.databaseManiger
            .update('AllowDM', 0, message.guild.id)
            .then(() => {
              message.channel.send('Setting turned off');
            })
            .catch(e => message.channel.send(`Error updating setting: ${e.message || e}`) && console.log(e));
        } else if (res === 'yes') {
          client.databaseManiger
            .update('AllowDM', 1, message.guild.id)
            .then(() => {
              message.channel.send('Setting turned on');
            })
            .catch(e => message.channel.send(`Error updating setting: ${e.message || e}`) && console.log(e));
        } else {
          return message.channel.send('This is not a valid type! "yes" or "no"');
        }
        break;
      }

      case 'dav': {
        const res = args[0] as 'yes' | 'no';
        if (res === 'yes' && data.guildData?.AllowDM === 1) {
          return message.channel.send('Setting alredy set to yes.');
        } else if (res === 'no' && data.guildData?.AllowDM === 0) {
          return message.channel.send('Setting alredy set to no.');
        } else if (res === 'no') {
          client.databaseManiger
            .update('DeleteAV', 0, message.guild.id)
            .then(() => {
              message.channel.send('Setting turned off');
            })
            .catch(e => message.channel.send(`Error updating setting: ${e.message || e}`) && console.log(e));
        } else if (res === 'yes') {
          client.databaseManiger
            .update('DeleteAV', 1, message.guild.id)
            .then(() => {
              message.channel.send('Setting turned on');
            })
            .catch(e => message.channel.send(`Error updating setting: ${e.message || e}`) && console.log(e));
        } else {
          return message.channel.send('This is not a valid type! "yes" or "no"');
        }
      }

      case 'verify': {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send('❌ | Channel not found!');
        await client.databaseManiger
          .update('ChannelVerifyingID', channel.id, message.guild.id)
          .then(() => message.channel.send(`Verify channel set to ${channel.toString()}`))
          .catch(e => message.channel.send(`Error updating verify channel: ${e.message || e}`));
        break;
      }

      case 'mode': {
        const mode = args[0] as 'noneOff' | 'chatEquation';
        // NOTE: Should try making this dynamic or use switch case
        if (mode === 'noneOff' && data.guildData?.VarifactionMode === 'noneOff') {
          return message.channel.send('Setting alredy set to channel.');
        } else if (mode === 'chatEquation' && data.guildData?.VarifactionMode == 'chatEquation') {
          return message.channel.send('Setting alredy set to chatEquation.');
        } else if (mode === 'noneOff' && data.guildData?.VarifactionMode !== 'noneOff') {
          client.databaseManiger
            .update('VarifactionMode', `"${VarifactionModes.NONE}"`, message.guild.id)
            .then(() => {
              message.channel.send('Setting set noneOff');
            })
            .catch(e => message.channel.send(`Error updating settings: ${e.message || e}`) && console.log(e));
        } else if (mode === 'chatEquation' && data.guildData?.VarifactionMode !== 'chatEquation') {
          client.databaseManiger
            .update('VarifactionMode', `"${VarifactionModes.CHAT_EQUATION}"`, message.guild.id)
            .then(() => {
              message.channel.send('Setting set chatEquation');
            })
            .catch(e => message.channel.send(`Error updating settings: ${e.message || e}`) && console.log(e));
        } else {
          return message.channel.send('This is not a valid type!');
        }
        break;
      }

      default: {
        message.channel.send(helpCommand);
        break;
      }
    }
  }
}
