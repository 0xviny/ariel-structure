import { Schema, model } from "mongoose";

export default model(
  "guilds",
  new Schema(
    {
      _id: { type: Number, unique: true },
      config: {
        prefix: { type: String, default: "c" },
      },
    },
    {
      versionKey: false,
      autoIndex: false,
    }
  )
);
