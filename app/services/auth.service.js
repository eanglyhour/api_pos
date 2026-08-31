const crypto = require("crypto");

const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

const { hashToken } = require("../utils/hash");

const createSession = async (user, deviceId = null) => {
  const accessToken = generateAccessToken(user);

  const familyId = crypto.randomUUID();

  const refreshToken = generateRefreshToken(
    user,
    familyId
  );

  const tokenHash = hashToken(refreshToken);

  const decoded = verifyRefreshToken(refreshToken);

  await RefreshToken.create({
    userId: user._id,
    tokenHash,
    familyId,
    deviceId,
    expiresAt: new Date(decoded.exp * 1000),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const refresh = async (token) => {
  const decoded = verifyRefreshToken(token);

  if (decoded.type !== "refresh") {
    throw new Error("Invalid refresh token");
  }

  const tokenHash = hashToken(token);

  const storedToken = await RefreshToken.findOne({
    tokenHash,
  });

  if (!storedToken) {
    throw new Error("Refresh token not found");
  }

  if (storedToken.revokedAt) {
    await RefreshToken.updateMany(
      {
        familyId: storedToken.familyId,
      },
      {
        $set: {
          revokedAt: new Date(),
        },
      }
    );

    throw new Error("Refresh token reuse detected");
  }

  if (storedToken.expiresAt < new Date()) {
    throw new Error("Refresh token expired");
  }

  const user = await User.findById(decoded.sub);

  if (!user) {
    throw new Error("User not found");
  }

  storedToken.revokedAt = new Date();
  await storedToken.save();

  const accessToken = generateAccessToken(user);

  const newRefreshToken = generateRefreshToken(
    user,
    storedToken.familyId
  );

  const newTokenHash = hashToken(newRefreshToken);

  const newDecoded = verifyRefreshToken(
    newRefreshToken
  );

  await RefreshToken.create({
    userId: user._id,
    tokenHash: newTokenHash,
    familyId: storedToken.familyId,
    deviceId: storedToken.deviceId,
    expiresAt: new Date(newDecoded.exp * 1000),
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

const logout = async (token) => {
  const tokenHash = hashToken(token);

  await RefreshToken.findOneAndUpdate(
    {
      tokenHash,
    },
    {
      $set: {
        revokedAt: new Date(),
      },
    }
  );
};

module.exports = {
  createSession,
  refresh,
  logout,
};