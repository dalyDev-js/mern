import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import AppError from "../utils/appError.js";

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please Prodive your Fullname!"],
  },
  username: {
    type: String,
    required: [true, "Please Prodive your username!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Prodive your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Provide a valid email"],
  },
  gender: {
    type: String,
    required: [true, "Please Prodive your gender!"],
    enum: ["male", "female", "gay"],
  },
  profilePic: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["client", "engineer", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please Confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same!!!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  uesrPassword
) {
  return await bcrypt.compare(candidatePassword, uesrPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
