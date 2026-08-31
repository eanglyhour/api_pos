require("dotenv").config();

const app = require("./app");
const connectDB = require("./app/config/database");
const autoPermission = require("./app/middleware/autoPermission");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    await autoPermission(app);

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

startServer();