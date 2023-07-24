export default class Command {
  constructor(client, options) {
    this.client = client
    this.name = options.name
    this.aliases = options.aliases || []
    this.description = options.description || "Nenhuma descrição."
    this.usage = options.usage || ""
    this.cooldown = options.cooldown || 5000
    this.owner = options.owner || false
  }
}
