import { Token } from "../schema/model.js";

Token;

export const returnResult = (status, result) => {
  return {
    success: status,
    data: result,
  };
};

export const validationError = (error) => {
  return {
    success: false,
    error: error.message || "Validation failed",
  };
};

const authenticateUser = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password
  );
};

const saveRefreshToken = async (Id, refreshItem) => {
  return await Token.create({ Id, refreshItem });
};

// Remove refresh token (logout)
const removeRefreshToken = async (refreshItem) => {
  return await Token.deleteOne({ refreshItem });
};

// Verify refresh token
const verifyRefreshToken = async (refreshToken) => {
  const tokenDoc = await Token.findOne({ refreshToken });
  if (!tokenDoc) {
    throw new Error("Refresh token not found or already logged out");
  }
  return jwt.verify(refreshToken, REFRESH_SECRET);
};
