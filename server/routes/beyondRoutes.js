const express = require("express");
const router = express.Router();

const {
  getBeyond, getBeyondById, createBeyond, updateBeyond, deleteBeyond,
} = require("../controllers/beyondController");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");
const {
  createBeyondRules, updateBeyondRules, idParamRule, listQueryRules,
} = require("../validators/beyondValidator");

router.get("/", listQueryRules, validate, getBeyond);
router.get("/:id", idParamRule, validate, getBeyondById);

router.post("/", protect, authorize("admin"), createBeyondRules, validate, createBeyond);
router.put("/:id", protect, authorize("admin"), updateBeyondRules, validate, updateBeyond);
router.delete("/:id", protect, authorize("admin"), idParamRule, validate, deleteBeyond);

module.exports = router;
