import client from "../../../../mainClient.js";
import { ApplicationCommandOptionType } from "discord.js";
import { readFileSync } from "fs";

const emojis = JSON.parse(
  readFileSync("./source/classes/utils/json/emojis.json", "utf8")
);
const config = JSON.parse(
  readFileSync("./source/classes/utils/json/config.json", "utf8")
);

client.on("interactionCreate", async (interaction) => {
  const int = interaction,
    ctx = {
      user: interaction.user,
      guild: interaction.guild,
      channel: interaction.channel,
    };

  if (interaction.commandType === 1) {
    const { commandName } = interaction;
    let cmd = client.slashCommands.get(commandName);

    if (!cmd)
      return interaction?.reply(
        `${emojis.error} **${config.text.separator}** ${ctx.user}, Não achei nenhum comando relacionado a \`${commandName}\` em minha memória interna.`
      );

    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    try {
      await cmd.run(ctx, int, emojis, config).catch((err) => {
        console.log(err);
        int?.reply({
          content: `${emojis.error} ${ctx.user}, infelizmente ocorreu um erro ao executar o comando, por favor tire print desta mensagem e abra um ticket em meu servidor de suporte.\n\`\`\`\n${err.stack}\n\`\`\``,
          ephemeral: true,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
});
