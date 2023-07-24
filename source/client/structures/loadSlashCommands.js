import { readdirSync as read } from "fs";
import { color } from "console-log-colors";

export default async (client) => {
  const Commands = [];
  read("./source/commands/slash/").forEach(async (dir) => {
    const commands = read(`./source/commands/slash/${dir}`);

    for (let file of commands) {
      const Query = (await import(`../../commands/slash/${dir}/${file}`))
        .default;
      const Command = new Query(client);
      if (Command.name) {
        Commands.push(Command);
        client.slashCommands.set(Command.name, Command);
      } else {
        continue;
      }
    }
  });

  client.on("ready", async () => {
    /*
    let guild = client.guilds.cache.get("1109243621502365751");
    guild.commands.set(Commands);
    */

    client.application.commands.set(Commands);
    console.log(
      color.red(`[SLASH COMMANDS] - Slash Commands carregado com sucesso!`)
    );
  });
};
