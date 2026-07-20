const Beyond = require("../models/Beyond");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * GET /api/beyond?branch=CSE&category=startup&search=...&page=&limit=
 * Public. branch filter includes "All" entries too — mirrors beyond.html's
 * renderCards(): l.branch === branch || l.branch === "All".
 */
exports.getBeyond = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;

  const filter = {};
  if (req.query.branch) filter.branch = { $in: [req.query.branch.toUpperCase(), "All"] };
  if (category) filter.category = category;
  if (search) {
    const re = new RegExp(escapeRegex(search), "i");
    filter.$or = [{ title: re }, { description: re }];
  }

  const [items, total] = await Promise.all([
    Beyond.find(filter).sort({ createdAt: 1 }).skip((page - 1) * limit).limit(limit),
    Beyond.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, items, "Beyond entries fetched", {
      page, limit, total, totalPages: Math.max(Math.ceil(total / limit), 1),
    })
  );
});

exports.getBeyondById = asyncHandler(async (req, res) => {
  const item = await Beyond.findById(req.params.id);
  if (!item) throw ApiError.notFound("Beyond entry not found");
  res.status(200).json(new ApiResponse(200, item, "Beyond entry fetched"));
});

// POST /api/beyond — admin only (guide.html has no Beyond management UI in the original app)
exports.createBeyond = asyncHandler(async (req, res) => {
  const item = await Beyond.create(req.body);
  res.status(201).json(new ApiResponse(201, item, "Beyond entry created"));
});

exports.updateBeyond = asyncHandler(async (req, res) => {
  const item = await Beyond.findById(req.params.id);
  if (!item) throw ApiError.notFound("Beyond entry not found");
  Object.assign(item, req.body);
  await item.save();
  res.status(200).json(new ApiResponse(200, item, "Beyond entry updated"));
});

exports.deleteBeyond = asyncHandler(async (req, res) => {
  const item = await Beyond.findByIdAndDelete(req.params.id);
  if (!item) throw ApiError.notFound("Beyond entry not found");
  res.status(200).json(new ApiResponse(200, null, "Beyond entry deleted"));
});
