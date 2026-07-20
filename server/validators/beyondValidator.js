const { body, param, query } = require("express-validator");

const CATEGORIES = ["college", "startup", "gate", "national", "international"];

exports.createBeyondRules = [
  body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 150 }),
  body("branch").trim().notEmpty().withMessage("Branch is required").isLength({ max: 20 }),
  body("category").isIn(CATEGORIES).withMessage("Invalid category"),
  body("description").optional().trim().isLength({ max: 500 }),
  body("howto").optional().trim().isLength({ max: 1000 }),
  body("skills").optional().isArray(),
  body("resources").optional().isArray(),
];

exports.updateBeyondRules = [
  param("id").isMongoId().withMessage("Invalid id"),
  body("title").optional().trim().notEmpty().isLength({ max: 150 }),
  body("branch").optional().trim().isLength({ max: 20 }),
  body("category").optional().isIn(CATEGORIES).withMessage("Invalid category"),
  body("description").optional().trim().isLength({ max: 500 }),
  body("howto").optional().trim().isLength({ max: 1000 }),
  body("skills").optional().isArray(),
  body("resources").optional().isArray(),
];

exports.idParamRule = [param("id").isMongoId().withMessage("Invalid id")];

exports.listQueryRules = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  query("category").optional().isIn(CATEGORIES),
];
