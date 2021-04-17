import type { Message, MessageOptions } from 'discord.js';

export default class MessageSafe {
  id: string;
  channel_id: string;
  author_id: string;
  content: string;
  createdAt: Date;
  constructor(private $message: Message) {
    this.id = $message.id;
    this.channel_id = $message.channel.id;
    this.content = $message.content;
    this.author_id = $message.author.id;
    this.createdAt = $message.createdAt;
  }

  public send(content: { to: 'user' | 'channel'; content: MessageOptions } | string): Promise<MessageSafe> {
    return new Promise((resolve, reject) => {
      if (typeof content === 'string') content = { content: { content: content }, to: 'channel' };

      if (content.to === 'channel') {
        this.$message.channel
          .send(content.content)
          .then(m => {
            if (Array.isArray(m)) m = m[0];
            const msg = new MessageSafe(m);
            resolve(msg);
          })
          .catch(e => reject(e));
      } else if (content.to === 'user') {
        this.$message.member
          ? this.$message.member
              .send(content.content)
              .then(m => {
                if (Array.isArray(m)) m = m[0];
                const msg = new MessageSafe(m);
                resolve(msg);
              })
              .catch(e => reject(e))
          : reject(new Error('Member is not found cant send to nothing'));
      }
    });
  }

  public async awaitMessageAuthor(
    message: MessageSafe,
    options: { type: 'user' | 'channel'; time: number }
  ): Promise<MessageSafe | null> {
    return new Promise(async (resolve, reject) => {
      if (options.type === 'channel') {
        const col = await this.$message.channel
          .awaitMessages((m: Message) => m.author.id === message.author_id && !m.author.bot, {
            time: options.time ?? 1000,
            max: 1,
            errors: ['time'],
          })
          .then(c => c.first())
          .catch(c => {
            reject(c);
            return c;
          });

        return col !== undefined ? resolve(new MessageSafe(col)) : resolve(null);
      } else if (options.type === 'user') {
        const col =
          this.$message.member && this.$message.member.user.dmChannel
            ? await this.$message.member.user.dmChannel
                .awaitMessages((m: Message) => m.author.id === this.$message.author.id && !m.author.bot, {
                  errors: ['time'],
                  max: 1,
                  time: options.time,
                })
                .then(c => c.first())
                .catch(reject)
            : null;

        return col ? resolve(new MessageSafe(col)) : resolve(null);
      }
      return null;
    });
  }
}
