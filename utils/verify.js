import jwt, { decode } from "jsonwebtoken";

import dotenv from "dotenv";

// Load .env file contents into process.env
dotenv.config();

const { SECRET_KEY } = process.env;

import express from "express";

import { v4 as uuidv4 } from "uuid";

// Secret key for signing the token

// Function to generate token
export const generateToken = (user) => {
  // Generate a unique identifier
  const sessionId = uuidv4();

  // Create a payload
  const payload = {
    id: user.id,
    email: user.email,
    // sessionId: sessionId,
  };

  // Sign the token with a secret key and expiration time
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // Expires in 1 hour
  return token;
};

export const verifyToken = (req, res, next) => {
  // Authenticate Token!

  const authHeader = req.headers["authorization"]?.trim(); // Remove any extra spaces or newlines
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    // Attach the user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
