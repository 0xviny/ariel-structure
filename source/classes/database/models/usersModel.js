import { Schema, model } from "mongoose";

export default model(
  "users",
  new Schema(
    {
      _id: { type: String, unique: true },
      money: { type: Number, default: 0 },
      banco: { type: Number, default: 0 },
    },
    {
      versionKey: false,
      autoIndex: false,
    }
  )
);
