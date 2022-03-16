import { Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imagePath: { type: String, required: false },
  friendList: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  requestList: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

export interface User {
  id: string,
  username: string,
  fullName: string,
  email: string,
  password: string,
  imagePath: string,
  friendList: User[],
  requestList: User[]
}
