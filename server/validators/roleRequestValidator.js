const { body, param } = require("express-validator");

exports.createRoleRequestRules = [
  body("roleName").trim().notEmpty().withMessage("Role name is required").isLength({ max: 150 }),
  body("branch").trim().notEmpty().withMessage("Branch is required").isLength({ max: 20 }),
  body("summary").trim().notEmpty().withMessage("Summary is required").isLength({ max: 1000 }),
];

exports.idParamRule = [param("id").isMongoId().withMessage("Invalid request id")];
