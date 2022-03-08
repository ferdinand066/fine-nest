import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: false },
});

export interface User {
  id: string,
  username: string,
  fullName: string,
  email: string,
  password: string,
  imagePath: string,
}
