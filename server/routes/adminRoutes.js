const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const {
  loginAdmin, getMe, getDashboardStats, getRoleInterest,
  refreshToken, logoutAdmin, forgotPassword, resetPassword,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { loginRules, interestQueryRules } = require("../validators/adminValidator");
const { forgotPasswordRules, resetPasswordRules } = require("../validators/authValidator");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false,
  message: { success: false, statusCode: 429, message: "Too many attempts, please try again later." },
});
const sensitiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false,
  message: { success: false, statusCode: 429, message: "Too many attempts. Please try again in an hour." },
});
const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false,
  message: { success: false, statusCode: 429, message: "Too many requests." },
});

router.post("/login", authLimiter, loginRules, validate, loginAdmin);
router.post("/refresh", refreshLimiter, refreshToken);
router.post("/logout", logoutAdmin);
router.post("/forgot-password", sensitiveLimiter, forgotPasswordRules, validate, forgotPassword);
router.post("/reset-password", sensitiveLimiter, resetPasswordRules, validate, resetPassword);

router.get("/me", protect, authorize("admin"), getMe);
router.get("/dashboard", protect, authorize("admin"), getDashboardStats);
router.get("/interest", protect, authorize("admin"), interestQueryRules, validate, getRoleInterest);

module.exports = router;