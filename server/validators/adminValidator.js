const { body, query } = require("express-validator");

exports.loginRules = [
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.interestQueryRules = [
  query("branch").optional().trim().isLength({ max: 20 }),
  query("type").optional().isIn(["committed", "exploring"]),
];
