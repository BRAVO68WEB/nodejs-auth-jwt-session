const { Router } = require("express");
const controller = require("../controllers/home");

const router = Router();

router.get("/", controller.home);

module.exports = router;
