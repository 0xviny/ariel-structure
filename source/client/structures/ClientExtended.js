// CLIENT IMPORTS

import { Client, Collection, GatewayIntentBits } from "discord.js";
import { readFileSync } from "fs";

import mongo from "mongoose";

import LoadCommands from "./loadCommands.js";
import LoadSlashCommands from "./loadSlashCommands.js";

import mainFunctions from "../../classes/utils/function/main.js";
import mainDatabase from "../../classes/database/main.js";

const EmojisPath = JSON.parse(
  readFileSync("./source/classes/utils/json/emojis.json", "utf8")
);
const config = JSON.parse(
  readFileSync("./source/classes/utils/json/config.json", "utf8")
);

// CONSTRUCTOR CLIENT

class CustomClient extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
      ],
      sweepers: {
        messages: {
          interval: 60,
          lifetime: 600,
        },
      },
    });

    // CLIENT COLLECTIONS

    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.aliases = new Collection();
    this.cooldown = new Collection();
    this.blackjack = new Collection();

    // CLIENT

    this.ariel = {
      database: {
        robson: mainDatabase,
      },
    };
    this.functions = mainFunctions;
    this.config = config;
    this.emoji = EmojisPath;
    this.await = (ms) =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, ms)
      );
  }

  // CONNECT DATABASE

  async connectDatabase() {
    mongo.connect(process.env.MONGO_URL);
  }

  // START SOURCE

  async start() {
    LoadCommands(this);
    LoadSlashCommands(this);
    await import("../events/main.js");
    return await super.login(process.env.DISCORD_TOKEN);
  }
}

export default CustomClient;
