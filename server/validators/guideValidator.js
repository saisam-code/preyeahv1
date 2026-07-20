const { body, param } = require("express-validator");

exports.registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("branch").trim().notEmpty().withMessage("Branch is required").isLength({ max: 20 }),
  body("roleNames").isArray({ min: 1 }).withMessage("Select at least one role to guide"),
  body("roleNames.*").isString().trim().notEmpty(),
  body("bio").optional({ nullable: true }).trim().isLength({ max: 1000 }),
];

exports.loginRules = [
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.idParamRule = [param("id").isMongoId().withMessage("Invalid guide id")];

exports.setStatusRules = [
  param("id").isMongoId().withMessage("Invalid guide id"),
  body("status").isIn(["pending", "approved", "rejected"]).withMessage("Invalid status"),
];

exports.assignRolesRules = [
  param("id").isMongoId().withMessage("Invalid guide id"),
  body("roleNames").isArray({ min: 1 }).withMessage("Select at least one role"),
  body("roleNames.*").isString().trim().notEmpty(),
];
