import { readdirSync as read } from "fs"

export default async(client) => {
  read("./source/commands/prefix/").forEach(async (dir) => {
    const commands = read(`./source/commands/prefix/${dir}`)

    for(let file of commands) {
      const Query = (await import(`../../commands/prefix/${dir}/${file}`)).default
      const Command = new Query(client)
      if(Command.name) {
        client.commands.set(Command.name, Command)
      } else {
        continue
      }
      if(Command.aliases && Array.isArray(Command.aliases)) Command.aliases.forEach(x => client.aliases.set(x, Command.name))
    }
  })
}