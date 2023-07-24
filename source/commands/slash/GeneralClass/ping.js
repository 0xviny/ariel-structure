import { ApplicationCommandType } from "discord.js";
import SlashCommand from "../../../client/structures/base/SlashCommand.js";

export default class PingClassSlashCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: "ping",
      description:
        "｢general｣ Veja meu tempo de resposta e minha latência com a api do Discord.",
      type: ApplicationCommandType.ChatInput,
      usage: "/ping",
    });
  }
  async run(ctx, int) {
    var msg = await int?.reply(`ping?`).then((msg) => {
      msg.edit({
        content: `🏓 **Pong**! Minha latência está em \`${Math.round(
          this.client.ws.ping
        )}ms\`, respondi está mensagem em \`${
          Date.now() - int.createdTimestamp
        }ms\`!`,
        ephemeral: false,
      });
    });
  }
}
