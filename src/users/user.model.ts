import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: false },
});

export interface User {
  id: string,
  email: string,
  password: string,
  imagePath: string,
}
