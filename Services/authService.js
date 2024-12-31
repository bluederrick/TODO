import { Login, Register } from "../schema/model.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import DTOValidator from "../utils/validator.js";
import session from "express-session";
import { generateToken } from "../utils/verify.js";

export const registerService = async (data) => {
  const registerData = await DTOValidator(Register)(data);

  if (!registerData) {
    return {
      message: `KIndly provide your Registration details`,
    };
  }
  console.log(registerData, "lavish");
  // {
  const { email, password } = registerData.data;

  const isUserExist = await Register.findOne({ email: email });
  console.log(isUserExist);
  if (isUserExist && isUserExist.email) {
    return {
      success: false,
      message: `User already exists. Kindly enter another email address`,
    };
  } else {
    // const { password } = data;
    console.log(password);
    // Hash the password
    const saltRounds = 10; // Determines the computational cost
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Replace plain-text password with hashed password
    data.password = hashedPassword;

    const newUser = new Register(data);
    const savedUser = await newUser.save();

    return {
      success: true,
      message: "User registered successfully",
      data: savedUser,
    };
  }
  // };
};

export const loginUserService = async ({ ...data }) => {
  try {
    const { email, password } = data;
    // Check if user exists

    const user = await Register.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });

    if (!user) {
      console.log("User not found in database");
      return null;
    }

    // Validate password

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      console.log("Invalid password");
      return null;
    }
    // Generate token
    const token = generateToken(user);
    console.log("Generated token:", token);
    // Save refresh token to the database

    return { token };
  } catch (err) {
    console.error("Error in loginUserService:", err.message);
    throw err;
  }
};

export const logOutService = (session) => {
  return new Promise((resolve, reject) => {
    session.destroy((err) => {
      if (err) {
        reject("Error logging out");
      } else {
        resolve("Logged out");
      }
    });
  });
};
