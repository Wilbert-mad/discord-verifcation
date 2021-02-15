import BaseEvent from '../structures/BaseEvent';
import type verifyClient from '../structures/VerifyClient';

export default class Ready extends BaseEvent {
  constructor() {
    super('ready');
  }

  async run(client: verifyClient) {
    console.log(`${client.user?.username} is ready`);
    client.user?.setPresence({ activity: { name: ';help' } });

    console.log(
      'GuildConfigs retreved loaded servers: ',
      (await client.databaseManiger.db?.all('SELECT ID FROM guildConfigs'))?.length
    );
  }
}
