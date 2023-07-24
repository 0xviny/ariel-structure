import User from "./models/usersModel.js";
import Guild from "./models/guildModel.js";

class Database {
  constructor() {
    this.users = User;
    this.guilds = Guild;
  }

  async find(id, type, filter = "") {
    if (type == "users") {
      let data = await User.findOne({ _id: id }, filter);
      if (!data) data = await User.create({ _id: id });
      return data;
    } else if (type == "guilds") {
      let data = await Guild.findOne({ _id: id }, filter);
      if (!data) data = await Guild.create({ _id: id });
      return data;
    }
  }

  async updateCoins(id, amount) {
    if (!amount || !id || isNaN(amount)) return "error";
    await User.updateOne(
      { _id: id },
      { $inc: { money: amount } },
      { upsert: true }
    );
  }
}

export default new Database();
