const { body, param } = require("express-validator");

exports.registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("branch").trim().notEmpty().withMessage("Branch is required").isLength({ max: 20 }),
];

exports.loginRules = [
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.interestRules = [
  body("roleId").isMongoId().withMessage("Invalid role id"),
  body("committed").isBoolean().withMessage("committed must be true or false").toBoolean(),
];

exports.roleIdParamRule = [param("roleId").isMongoId().withMessage("Invalid role id")];
