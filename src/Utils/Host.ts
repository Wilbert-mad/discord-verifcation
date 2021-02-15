import type { ClientUser } from 'discord.js';
import EventEmitter from 'events';
import fetch from 'node-fetch';

interface events {
  error: [error: any];
  fetched: [data: Response]
}

interface PostData {
  id: string,
  key: string,
  servers: string,
  users: string,
  clientInfo: ClientUser,
}

export default class Host extends EventEmitter {
  constructor(private apiKey: string, public id?: string) {
    super();
    this.setMaxListeners(3);
  }

  private async _APIrequest<body extends Object>(endpont: string, method: 'GET' | 'POST', body?: body) {
    return fetch(`https://danbot.host/api/${endpont}`, {
      method,
      headers: {
        'content-type': 'application/json',
      },
      body: body ? JSON.stringify(body) : '',
    });
  }

  async clientInfo() {
    if (!this.id) return null;
    return await this._APIrequest(`/bot/${this.id}/info`, 'GET');
  }

  public async post(data: { servers: string; users: string; clientInfo: ClientUser }): Promise<void> {
    const dataBody: PostData = {
      id: data.clientInfo.id,
      key: this.apiKey,
      servers: data.servers,
      users: data.users,
      clientInfo: data.clientInfo,
    };
    const res = await this._APIrequest(`bot/${data.clientInfo.id}/stats`, 'POST', dataBody);
    this.emit('fetched', res);
    return new Promise((resolve, reject) => {
      try {
        if (res.status >= 500) throw new Error(`DanBot Hosting server error, statusCode: ${res.status}`);

        const data = res.body;

        if (res.status === 200) {
          // @ts-ignore-nex-line
          if (!data.error) {
            if (data === undefined) throw new Error('Data not found');
            this.emit('post');
            resolve();
          }
        } else if (res.status == 400) {
          // Bad request
          // @ts-ignore-nex-lines
          if (res.error) new Error(res.message);
        } else if (res.status == 429) {
          // Rate limit hit
          // @ts-ignore-nex-line
          if (res.error) new Error(res.message);
        } else {
          throw new Error('An unknown error has occurred');
        }
      } catch (error) {
        this.emit('error', error);
        reject(error);
      }
    });
  }

  on<k extends keyof events>(event: k, listener: (...args: events[k]) => void): this;
  on() {
    return this;
  }
}
