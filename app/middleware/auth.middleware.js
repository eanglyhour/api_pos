const {
  verifyAccessToken,
} = require("../utils/jwt");

const authMiddleware = (
  req,
  res,
  next
) => {
  try {
    const header =
      req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        success: false,
        message: "Authorization header required",
      });
    }

    const [type, token] =
      header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const payload =
      verifyAccessToken(token);

    if (payload.type !== "access") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};

module.exports = authMiddleware;