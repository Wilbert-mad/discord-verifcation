import type { Message } from 'discord.js';

export class ValidationModeManger {
  async equationMode(message: Message) {
    const emg = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'];
    const ops = ['+', '-', '*', '/'];
    const operation = ops[Math.floor(Math.random() * ops.length)];
    const dCache = {
      firstNumber: Math.floor(Math.random() * Object.keys(emg).length),
      secondNumber: Math.floor(Math.random() * Object.keys(emg).length),
      operation,
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

    if (!col) return;
    const res = parseInt(col.content);

    if (isNaN(res)) return message.channel.send('Error: Not a number');
    else if (typeof res === 'number' && anc === res) {
      console.log('You go it right!');
    }
  }
}
