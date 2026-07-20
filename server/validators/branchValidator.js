const { body, param } = require("express-validator");

exports.createBranchRules = [
  body("name").trim().notEmpty().withMessage("Branch name is required").isLength({ min: 2, max: 20 }),
];

exports.branchNameParamRule = [
  param("name").trim().notEmpty().withMessage("Branch name is required"),
];
