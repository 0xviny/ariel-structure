import "dotenv/config";
import Client from "./source/client/structures/ClientExtended.js";
const client = new Client();

import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";

process.on("uncaughtException", (err) => {
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
});

/*
client.on("ready", async () => {
  const guildIds = client.guilds.cache.map((guild) => guild.id);
  const clientId = "1118318998896005201";

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  rest
    .put(Routes.applicationCommands(client.user.id), { body: [] })
    .then(() => console.log(`Successfully deleted client commands`))
    .catch(console.error);

  guildIds.forEach((guildId) => {
    rest
      .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
      .then(() =>
        console.log(`Successfully deleted guild command in ${guildId}`)
      )
      .catch(console.error);
  });
});
*/

export default client;

client.start();