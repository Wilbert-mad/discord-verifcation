import type { Message } from 'discord.js';

export class ValidationModeManger {
  async equationMode(message: Message): Promise<boolean> {
    const emg = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'];
    const ops = ['+', '-', '*', '/'];
    const dCache = {
      firstNumber: Math.floor(Math.random() * Object.keys(emg).length),
      secondNumber: Math.floor(Math.random() * Object.keys(emg).length),
      operation: ops[Math.floor(Math.random() * ops.length)],
    };
    const anc = Math.round(eval(`${dCache.firstNumber} ${dCache.operation} ${dCache.secondNumber}`));
    const msg = await message.channel.send(
      `Solve this problem in under a minute; ${emg[dCache.firstNumber]} ${dCache.operation} ${emg[dCache.secondNumber]}`
    );
    const col = await msg.channel
      .awaitMessages((m: Message) => m.author.id === message.author.id && !m.author.bot, {
        errors: ['time'],
        max: 1,
        time: 60000,
      })
      .then(c => c.first())
      .catch(_e => message.channel.send('Time run out.'));

    if (!col) return false;
    const res = parseInt(col.content);

    if (isNaN(res)) return message.channel.send('Error: Not a number') && false;
    else if (typeof res === 'number' && res === anc) {
      return true;
    }
    return true;
  }
}
