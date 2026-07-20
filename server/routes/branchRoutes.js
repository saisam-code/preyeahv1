const express = require("express");
const router = express.Router();

const { getBranches, createBranch, deleteBranch } = require("../controllers/branchController");
const { protect, authorize } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { createBranchRules, branchNameParamRule } = require("../validators/branchValidator");

router.get("/", getBranches);
router.post("/", protect, authorize("admin"), createBranchRules, validate, createBranch);
router.delete("/:name", protect, authorize("admin"), branchNameParamRule, validate, deleteBranch);

module.exports = router;
