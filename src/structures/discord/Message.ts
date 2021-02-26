import { Message, Structures } from 'discord.js';
import type verifyClient from '../VerifyClient';
import type { verifyGuild } from './Guild';

export class verifyMessage extends Message {
  async translate(key: string) {
    const data = await (this.guild as verifyGuild).data();
    const languages = (this.client as verifyClient).languages.get(data?.Language ?? 'en-us');
    const message = languages?.get(key);
    return message;
  }

  async send(key: string) {
    const message = await this.translate(key);
    if (typeof message == 'string') return this.channel.send(message);
    // if (typeof message == 'function') return this.channel.send(message());
    else return this.channel.send('TRANSLATION_NOTFOUND');
  }
}

export default Structures.extend('Message', () => {
  return verifyMessage;
});
