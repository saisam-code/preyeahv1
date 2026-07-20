const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const {
  registerStudent, loginStudent, getMe, getInterestForRole, recordInterest,
  refreshToken, logoutStudent, forgotPassword, resetPassword, verifyEmail, resendVerification,
} = require("../controllers/studentController");

const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { registerRules, loginRules, interestRules, roleIdParamRule } = require("../validators/studentValidator");
const { forgotPasswordRules, resetPasswordRules, resendVerificationRules } = require("../validators/authValidator");

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

router.post("/register", authLimiter, registerRules, validate, registerStudent);
router.post("/login", authLimiter, loginRules, validate, loginStudent);
router.post("/refresh", refreshLimiter, refreshToken);
router.post("/logout", logoutStudent);

router.post("/forgot-password", sensitiveLimiter, forgotPasswordRules, validate, forgotPassword);
router.post("/reset-password", sensitiveLimiter, resetPasswordRules, validate, resetPassword);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", sensitiveLimiter, resendVerificationRules, validate, resendVerification);

router.get("/me", protect, authorize("student"), getMe);
router.get("/interest/:roleId", protect, authorize("student"), roleIdParamRule, validate, getInterestForRole);
router.post("/interest", protect, authorize("student"), interestRules, validate, recordInterest);

module.exports = router;