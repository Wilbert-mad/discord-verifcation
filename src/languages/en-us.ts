import BaseLanguage from '../structures/BaseLanguage';

export default class EN_US extends BaseLanguage {
  constructor() {
    super({
      error_occored: error => `**An error has occored!**\`\`\`diff\n- ${error.message || error}\n\`\`\``,
      Prefix_fetched: prefix => `Prefix is set to: \`${prefix}\``,
      Missing_perms: (userType, missing_perms) =>
        `${userType} is missing ${missing_perms.join(', ')} permission${missing_perms.length > 1 ? 's' : ''}`,
    });
  }
}
