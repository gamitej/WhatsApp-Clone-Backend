const router = require("express").Router();
const {
  uploadProfilePicture,
  getProfilePic,
} = require("../controller/user.controller");


router.get("/profile-pic", getProfilePic);


router.post("/upload-profile-pic", uploadProfilePicture);

module.exports = router;
