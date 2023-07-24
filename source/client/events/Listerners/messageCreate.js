import client from "../../../../mainClient.js";
import { readFileSync } from "fs";

const emojis = JSON.parse(
  readFileSync("./source/classes/utils/json/emojis.json", "utf8")
);
const config = JSON.parse(
  readFileSync("./source/classes/utils/json/config.json", "utf8")
);

client.on("messageCreate", async (message) => {
  let prefix;

  const mentionRegex = message.content.match(
    new RegExp(`^<@!?(${client.user.id})>`, "gi")
  );

  if (message.content.match(new RegExp(`^<@!?(${client.user.id})>`, "gi"))) {
    prefix = String(mentionRegex);
  } else {
    prefix = "c"; //prefixo do bot para responder em menção e prefix;
  }

  if (
    message.content == `<@${client.user.id}>` ||
    message.content == `<@!${client.user.id}>`
  )
    return message.reply(
      `👋 Olá ${message.author}, tudo bem? eu me chamo **${client.user.username}**, meu prefixo é "/" \`(SlashCommands)\` & "<@${client.user.id}>" \`(Minha Menção)\`, para ver minha lista de comandos utilize "<@${client.user.id}>help"!`
    );

  if (!message?.content.toLowerCase().startsWith(prefix)) return;

  let args = message?.content.slice(prefix.length).trim().split(/ +/g),
    cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    try {
      command.run(message, args, config, emojis).catch((err) => {
        console.log(err);
        message?.reply({
          content: `${emojis.error} ${message.author}, infelizmente ocorreu um erro ao executar o comando, por favor tire print desta mensagem e abra um ticket em meu servidor de suporte.\n\`\`\`\n${err.stack}\n\`\`\``,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
});
