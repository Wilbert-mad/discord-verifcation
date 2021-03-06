import { Message, Structures } from 'discord.js';
import { baselangs } from '../BaseLanguage';
import type verifyClient from '../VerifyClient';
import type { verifyGuild } from './Guild';

export class verifyMessage extends Message {
  async translate(key: keyof baselangs): Promise<Function | undefined>;
  async translate(key: string): Promise<Function | undefined>;
  async translate(key: string) {
    const data = await (this.guild as verifyGuild).data();
    const languages = (this.client as verifyClient).languages.get(data?.Language ?? 'en-us');
    const message = languages?.get(key);
    return message;
  }

  async send(key: keyof baselangs, ...args: any): Promise<Message>;
  async send(key: string, ...args: any): Promise<Message>;
  async send(key: string, ...args: any) {
    const message = await this.translate(key);
    if (!message) return this.channel.send('TRANSLATION_NOTFOUND');
    this.channel.send(message(...args));
  }

  async error(error: any) {
    console.log(error);
    const message = await this.translate('error_occored');
    if (!message) return this.reply('TRANSLATION_NOTFOUND');
    return await this.channel.send(message(error.message || error));
  }
}

export default Structures.extend('Message', () => {
  return verifyMessage;
});
