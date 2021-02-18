import BaseLanguage from '../structures/BaseLanguage';

export default class EN_US extends BaseLanguage {
  constructor() {
    super({
      hello: 'hello!',
    });
  }
}
