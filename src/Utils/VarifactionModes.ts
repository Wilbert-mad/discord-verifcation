import type { MessageSafe } from '../../Custom/dist';

export class ValidationModeManger {
  async equationMode(message: MessageSafe): Promise<boolean> {
    const emg = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'];
    const ops = ['+', '-', '*', '/'];
    const dCache = {
      firstNumber: Math.floor(Math.random() * Object.keys(emg).length),
      secondNumber: Math.floor(Math.random() * Object.keys(emg).length),
      operation: ops[Math.floor(Math.random() * ops.length)],
    };
    const anc = Math.round(eval(`${dCache.firstNumber} ${dCache.operation} ${dCache.secondNumber}`));
    const msg = await message.send(
      `Solve this problem in under a minute; ${emg[dCache.firstNumber]} ${dCache.operation} ${emg[dCache.secondNumber]}`
    );
    const col = await msg.awaitMessageAuthor(message, { type: 'channel', time: 60000 });

    if (!col) return false;
    const res = parseInt(col.content);

    if (isNaN(res)) return message.send('Error: Not a number') && false;
    else if (typeof res === 'number' && res === anc) {
      return message.send('Correct, role(s) given.') && true;
    }
    return (
      message.send(
        `Number is incorect, correct equation is \`${dCache.firstNumber} ${dCache.operation} ${dCache.secondNumber} = ${anc}\``
      ) && false
    );
  }
}
