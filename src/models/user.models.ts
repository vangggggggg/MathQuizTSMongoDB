import mongoose, { Document } from "mongoose";

// Định nghĩa interface cho User
export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  fullName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  avatar: string;
  isVerified: boolean;
  isBanned: boolean;
  isDeleted: boolean;
  createAt: Date;
  createById: string;
  updateAt: Date;
  updateById: string;
  deleteAt: Date;
}

// Định nghĩa schema cho User
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  avatar: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
  createById: { type: String, default: null },
  updateAt: { type: Date, default: Date.now },
  updateById: { type: String,default: null },
  deleteAt: { type: Date, default: null },
});

export const User = mongoose.model<IUser>("User", UserSchema);
