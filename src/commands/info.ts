import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../structures/BaseCommand';
import type verifyClient from '../structures/VerifyClient';

export default class Info extends BaseCommand {
  constructor() {
    super('info');
  }

  async run(client: verifyClient, message: Message) {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('Information', message.author.displayAvatarURL())
      .addFields([
        {
          name: 'Guilds',
          value: client.guilds.cache.size,
          inline: true,
        },
        {
          name: 'Library',
          value: 'Discord.js',
          inline: true,
        },
        {
          name: 'Language',
          value: 'Typescript',
          inline: true,
        },
        {
          name: 'GitHub',
          value: '[GitHub Repository](https://github.com/kei-projects/discord-verifcation)',
          inline: true,
        },
        {
          name: 'Invite',
          value:
            '[Link](https://discord.com/oauth2/authorize?client_id=708451235195519017&scope=bot&permissions=268561472)',
          inline: true,
        },
        {
          name: 'Devs',
          value: 'Xa_puppet',
          inline: true,
        },
        {
          name: 'Trello',
          value: '[Link Here](https://trello.com/b/lnKjiDZB/discord-verifaction)',
          inline: true,
        },
        {
          name: 'Version',
          value: '1.1.0-beta',
          inline: true,
        },
      ]);

    await message.channel.send(embed);
  }
}
