import BaseLanguage from '../structures/BaseLanguage';

export default class es_ES extends BaseLanguage {
  constructor() {
    super({
      error_occored: error => `**¡Ha ocurrido un error!**\`\`\`diff\n- ${error.message || error}\n\`\`\``,
      Prefix_fetched: prefix => `El prefix se a cambiado a: \`${prefix}\``,
      Missing_perms: missing_perms =>
        `
        Falta permiso${missing_perms.length > 1 ? 's' : ''} para el cliente o miembro; \`${missing_perms.join(', ')}\`
        `,
      Databese_data_not_found: id => `No se encontraron datos para ${id}.`,
    });
  }
}
