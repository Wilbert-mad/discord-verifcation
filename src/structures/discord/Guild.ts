import { Guild, Structures } from 'discord.js';
import verifyClient from '../VerifyClient';

export class varifyGuild extends Guild {
  async data() {
    return (this.client as verifyClient).databaseManiger.get(this.id);
  }

  async languge() {
    return this.data().then(d => d?.Language);
  }
}

export default Structures.extend('Guild', () => {
  return varifyGuild;
});
