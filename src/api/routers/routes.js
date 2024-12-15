const express = require("express");
const router = express.Router();

router.use("/athlete",require("./api_routes/athlete.routers"))
router.use("/event",require("./api_routes/event.routers"))

module.exports = router;