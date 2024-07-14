import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";
import hashPassword from "../utils/hashPassword";

export interface UserModel extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  loggedIn: Date;
  seconds: Number;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "password is required"] },
    role: { type: String, enum: ["user", "admin", "auth"], required: true },
    loggedIn: { type: Date, default: Date.now, required: true },
    seconds: { type: Number, default: 0, required: true },
  },
  { timestamps: false, versionKey: false }
);

UserSchema.pre<UserModel>("save", async function (next) {
  let user = this as UserModel;
  if (!user.isModified("password")) return next();

  const hash = await hashPassword(user.password);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserModel;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export default model<UserModel>("User", UserSchema);
