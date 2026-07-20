const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const ApiResponse = require("./utils/ApiResponse");

const app = express();

// ── Security & parsing middleware ──────────────────────────────
app.set("trust proxy", 1); // required behind Render's proxy for rate-limit/IP + secure cookies

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(mongoSanitize()); // strips $ and . from req.body/query/params to block NoSQL injection

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ── CORS ────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin(origin, callback) {
      // allow non-browser tools (curl/Postman) with no origin header
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// ── Rate limiting (global baseline; auth routes get a stricter one in Phase 5) ──
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, statusCode: 429, message: "Too many requests, please try again later." },
});
app.use("/api", globalLimiter);

// ── Health check ────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { uptime: process.uptime(), timestamp: Date.now() }, "Pre-Yeah API is healthy")
  );
});

// ── Feature routes (mounted as each module is built) ─────────────
// app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/branches", require("./routes/branchRoutes"));
app.use("/api/beyond", require("./routes/beyondRoutes"));
app.use("/api/guides", require("./routes/guideRoutes"));
app.use("/api/guidance", require("./routes/guidanceRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/role-requests", require("./routes/roleRequestRoutes"));

// ── 404 + centralized error handler (must be last) ───────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
