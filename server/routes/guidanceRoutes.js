const express = require("express");
const router = express.Router();

const {
  getGuidance, getGuidanceForRole, createGuidance, updateGuidance, deleteGuidance,
} = require("../controllers/guidanceController");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");
const {
  createGuidanceRules, updateGuidanceRules, idParamRule, roleIdParamRule, listQueryRules,
} = require("../validators/guidanceValidator");

router.get("/", listQueryRules, validate, getGuidance);
router.get("/for-role/:roleId", roleIdParamRule, validate, getGuidanceForRole);

router.post("/", protect, authorize("admin", "guide"), createGuidanceRules, validate, createGuidance);
router.put("/:id", protect, authorize("admin", "guide"), updateGuidanceRules, validate, updateGuidance);
router.delete("/:id", protect, authorize("admin", "guide"), idParamRule, validate, deleteGuidance);

module.exports = router;
