const express = require("express");
const router = express.Router();

router.use("/", require("./home"));
router.use("/user", require("./user"));

module.exports = router;
