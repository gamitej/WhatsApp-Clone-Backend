const router = require("express").Router();
const { userLogin, registerUser } = require("../controller/auth.controller");

router.post("/login", userLogin);

router.post("/register", registerUser);

module.exports = router;
