import type { Message } from 'discord.js';
import BaseCommand from '../structures/BaseCommand';
import type verifyClient from '../structures/VerifyClient';

export default class Ping extends BaseCommand {
  constructor() {
    super('ping');
  }

  async run(_client: verifyClient, message: Message) {
    const statTime = Date.now();
    await message.channel.send('pinging...').then(msg => {
      const endTime = Date.now();
      msg.edit(`Pong. \`${endTime - statTime}ms\``);
    });
  }
}
