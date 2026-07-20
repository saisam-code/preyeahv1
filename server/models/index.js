/**
 * Central model registry. Required once from server.js so every schema
 * is registered with Mongoose before any request is handled — regardless
 * of which routes/controllers happen to be mounted yet.
 *
 * Why this exists: Role's and Branch's pre("findOneAndDelete") cascade
 * hooks call mongoose.model("Guidance") directly (to avoid a circular
 * require with Guidance.js). If server.js only ever required Role.js
 * (via roleController -> roleRoutes), Guidance's schema was never
 * registered in the process, and mongoose.model("Guidance") threw
 * MissingSchemaError the first time a role was deleted — even though
 * models/Guidance.js exists on disk and is perfectly valid.
 */
require("./Branch");
require("./Role");
require("./Guidance");
require("./Beyond");
require("./Student");
require("./Guide");
require("./Admin");
require("./RoleInterest");
require("./RoleRequest");
