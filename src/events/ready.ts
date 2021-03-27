import BaseEvent from '../structures/BaseEvent';
import type verifyClient from '../structures/VerifyClient';

export default class Ready extends BaseEvent {
  constructor() {
    super('ready');
  }

  async run(client: verifyClient) {
    console.log(`${client.user?.username} is ready`);
    client.user?.setPresence({ activity: { name: ';help' } });
    const bans = await client.guildBans.all();

    bans.forEach(b => client.BansCache.set(b.ID, b));

    console.log(
      'GuildConfigs retreved loaded servers: ',
      (await client.databaseManiger.db?.all('SELECT ID FROM guildConfigs'))?.length,
      client.BansCache
    );
  }
}
