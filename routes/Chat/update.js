const User = require("../../modals/User");

const router = require("express").Router();

// get image
router.get("/profile-pic/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found", error: true });
    return res.status(200).json({ imgUrl: user.profilePic, error: false });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error: true });
  }
});

// upload image
router.post("/upload-profile-pic", async (req, res) => {
  try {
    const { userId, profilePicUrl } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: profilePicUrl },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "User not found", error: true });
    return res
      .status(200)
      .json({ message: "Profile picture updated successfully", error: false });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error: true });
  }
});

module.exports = router;
