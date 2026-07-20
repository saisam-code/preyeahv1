const { body } = require("express-validator");

exports.forgotPasswordRules = [
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email").normalizeEmail(),
];

exports.resetPasswordRules = [
  body("token").trim().notEmpty().withMessage("Reset token is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

exports.resendVerificationRules = [
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email").normalizeEmail(),
];