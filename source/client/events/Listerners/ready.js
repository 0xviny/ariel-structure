import { ActivityType } from "discord.js";
import { color } from "console-log-colors";
import ms from "ms";
import client from "../../../../mainClient.js";

import pkg from "util-stunks";
const { relativeTime } = pkg;

client.on("ready", async () => {
  client.connectDatabase(); //Conectividade com a database;

  let names = [
      `Fortnite em ${client.guilds.cache.size} servidores`,
      `Nova atualização!`,
      `Novo prefixo "/" (SlashCommands).`,
    ],
    stats = 0;

  setInterval(() => {
    client.user.setPresence({
      activities: [
        { name: names[stats++ % names.length], type: ActivityType.Playing },
      ],
      status: "online",
    });
  }, ms("60s"));

  console.log(
    color.red(`[CLIENTE] - Conectei em ${client.user.tag} - ${client.user.id}`)
  );
  console.log(
    color.green(`[COMANDOS] - Todos comandos carregado com sucesso!`)
  );
});
