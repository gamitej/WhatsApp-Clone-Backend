const User = require("../modals/User");

// get image - /profile?userId=<userId>
const getProfilePic = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found", error: true });
    return res.status(200).json({ imgUrl: user.profilePic, error: false });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error: true });
  }
};

const uploadProfilePicture = async (req, res) => {
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
};

module.exports = { getProfilePic, uploadProfilePicture };
