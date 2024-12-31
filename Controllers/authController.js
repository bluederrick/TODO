import express from "express";
import { loginUserService, registerService } from "../Services/authService.js";
import { generateToken } from "../utils/verify.js";

export const registerController = async (req, res) => {
  try {
    const registrationData = req.body;

    // Call the service function to handle the registration logic
    const result = await registerService(registrationData);
    console.log("Service result:", result.message);

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: result.message || "Registration successful",
        data: result.data || {}, // Include any additional data if available
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message || "Registration failed",
        errors: result.errors || [], // Include any errors if available
      });
    }
  } catch (error) {
    console.error("Error in registerController:", error);
    // Generic error response
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      errors: [error.message], // Provide the error message
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const userLogin = await loginUserService({ email, password });
  // console.log(userLogin )

  if (userLogin) {
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: userLogin.token,
    });
  }
  return res.json({
    data: `${userLogin}`,
    message: "error log in",
    type: "false",
  });
};

// logout users
export const logOutControllers = async (req, res) => {
  try {
    const message = await logOutService(req.session);
    res.send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};
