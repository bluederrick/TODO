import mongoose from "mongoose";
// import { PriorityLevels } from '../enums/priority.js';

const { Schema, model } = mongoose;

const taskSchema = new Schema({
  task: String,

  selectedPriority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: [false, "Priority is required"],
    default: "Low",
  },
  deadlineTask: {
    type: Date,
    validate: {
      validator: function (value) {
        return value >= new Date(); // Ensure deadline is not in the past
      },
      message: "Deadline must be in the future",
    },
  },
  descriptionTask: { type: String, required: false },

  titleTask: { type: String },
  dateCreated: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const registerSchema = new Schema({
  fullName: String,
  email: { type: String, unique: true, required: true },
  password: String,
  phoneNumber: Number,
  gender: String,
  customDate: { type: Date, default: Date.now },
});

const loginSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: String,
  loginDate: { type: Date, default: Date.now },
});

const TokenSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming you have a User model
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", // Auto-remove token after 7 days
  },
});



// Export both models
export const Task = model("Task", taskSchema);
export const Register = model("Register", registerSchema);
export const Login = model("Login", loginSchema);
export const Token = model("Token", TokenSchema);
