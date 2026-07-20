const express = require("express");
const router = express.Router();

const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");
const {
  createRoleRules,
  updateRoleRules,
  idParamRule,
  listQueryRules,
} = require("../validators/roleValidator");

// Public — role browsing needs no login (matches roles.html being viewable pre-auth)
router.get("/", listQueryRules, validate, getRoles);
router.get("/:id", idParamRule, validate, getRoleById);

// Admin + approved Guide (branch-scoped inside the controller)
router.post("/", protect, authorize("admin", "guide"), createRoleRules, validate, createRole);
router.put("/:id", protect, authorize("admin", "guide"), updateRoleRules, validate, updateRole);

// Admin only
router.delete("/:id", protect, authorize("admin"), idParamRule, validate, deleteRole);

module.exports = router;
