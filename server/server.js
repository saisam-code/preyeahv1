require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
require("./models"); // registers every schema before the app starts handling requests

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`[server] Pre-Yeah API running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });

  // Fail loudly on unhandled promise rejections instead of a silent hang
  process.on("unhandledRejection", (err) => {
    console.error(`[server] Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
}

start();
