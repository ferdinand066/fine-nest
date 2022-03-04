import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: false },
});

export interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  imagePath: string,
}
