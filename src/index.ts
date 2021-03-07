import { KEY, TOKEN } from './configs';
import './structures/discord';
import verifyClient from './structures/VerifyClient';
const client = new verifyClient();

// Production time
(async () => {
  await client.start(TOKEN, KEY);
})();
