import BaseLanguage from '../structures/BaseLanguage';

export default class EN_US extends BaseLanguage {
  constructor() {
    super({
      error_occored: error => `**An error has occored!**\`\`\`diff\n- ${error.message || error}\n\`\`\``,
      Prefix_fetched: prefix => `Prefix is set to: \`${prefix}\``,
      Missing_perms: missing_perms =>
        `
        permission${missing_perms.length > 1 ? 's' : ''} missing for client, or member; \`${missing_perms.join(', ')}\`
        `,
      Databese_data_not_found: id => `No data found for ${id}.`,
    });
  }
}
