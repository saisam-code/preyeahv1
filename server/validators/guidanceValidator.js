const { body, param, query } = require("express-validator");

exports.createGuidanceRules = [
  body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 150 }),
  body("branch").trim().notEmpty().withMessage("Branch is required").isLength({ max: 20 }),
  body("points").isArray({ min: 1 }).withMessage("At least one bullet point is required"),
  body("points.*").isString().trim().notEmpty(),
  body("role").optional({ nullable: true }).isMongoId().withMessage("Invalid role id"),
];

exports.updateGuidanceRules = [
  param("id").isMongoId().withMessage("Invalid id"),
  body("title").optional().trim().notEmpty().isLength({ max: 150 }),
  body("branch").optional().trim().isLength({ max: 20 }),
  body("points").optional().isArray({ min: 1 }).withMessage("At least one bullet point is required"),
  body("points.*").optional().isString().trim().notEmpty(),
  body("role").optional({ nullable: true }).isMongoId().withMessage("Invalid role id"),
];

exports.idParamRule = [param("id").isMongoId().withMessage("Invalid id")];
exports.roleIdParamRule = [param("roleId").isMongoId().withMessage("Invalid role id")];

exports.listQueryRules = [
  query("branch").optional().trim().isLength({ max: 20 }),
  query("role").optional().isMongoId(),
];
