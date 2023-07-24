import Command from "../../../client/structures/base/Command.js";

export default class PingClassCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description:
        "veja meu tempo de resposta e minha latência com a api do Discord.",
      aliases: ["pong"],
      cooldown: 3000,
    });
  }
  async run(message, args, config, database, emojis) {
    var msg = await message.reply(`ping?`).then((msg) => {
      msg.edit({
        content: `🏓 **Pong**! Minha latência está em \`${Math.round(
          this.client.ws.ping
        )}ms\`, respondi está mensagem em \`${
          Date.now() - message.createdTimestamp
        }ms\`!`,
      });
    });
  }
}
