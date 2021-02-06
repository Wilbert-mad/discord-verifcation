import { TOKEN } from './configs';
import verifyClient from './structures/VerifyClient'
const client = new verifyClient();

(async () => {
  await client.start(TOKEN);
})();
