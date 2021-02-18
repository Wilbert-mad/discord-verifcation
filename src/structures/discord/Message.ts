import { Message, Structures } from 'discord.js';
import type verifyClient from '../VerifyClient';
import type { varifyGuild } from './Guild';

export class varifyMessage extends Message {
  async send(key: string) {
    const data = await (this.guild as varifyGuild).data();
    const languages = (this.client as verifyClient).languages.get(data?.Language ?? 'en-us');
    const message = languages?.get(key);
    if (typeof message == 'string') return this.channel.send(message);
    // if (typeof message == 'function') return this.channel.send(message());
    else return this.channel.send('TRANSLATION_NOTFOUND');
  }
}

export default Structures.extend('Message', () => {
  return varifyMessage;
});
