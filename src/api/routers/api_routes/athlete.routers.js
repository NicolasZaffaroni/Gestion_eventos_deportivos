const express = require("express");
const router = express.Router();
const {register,login,getProfile} = require("../../controllers/athlete.controllers")
const {checkToken} = require('../../middleware/auth')


router.post("/register", register);
router.post("/login",login);
router.get("/profile", checkToken,getProfile)



module.exports = router;