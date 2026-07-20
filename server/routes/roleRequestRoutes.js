const express = require("express");
const router = express.Router();

const {
  createRoleRequest, listRoleRequests, dismissRoleRequest, clearRoleRequests,
} = require("../controllers/roleRequestController");
const { protect, authorize, optionalAuth } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { createRoleRequestRules, idParamRule } = require("../validators/roleRequestValidator");

router.post("/", optionalAuth, createRoleRequestRules, validate, createRoleRequest);

router.get("/", protect, authorize("admin"), listRoleRequests);
router.patch("/:id/dismiss", protect, authorize("admin"), idParamRule, validate, dismissRoleRequest);
router.delete("/", protect, authorize("admin"), clearRoleRequests);

module.exports = router;
