const { Router } = require("express");
const router = Router();

const connectDb = require("./db");

connectDb();

// router.use("/", require("./root"));
router.use("/test", require("./test"));
router.use("/runcode", require("./runcode"));

module.exports = router;