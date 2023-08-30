const router = require("express").Router();
const { createChat } = require("../controller/chat.controller");

// create chat
router.post("/create", createChat);

// find particular user chat - /user?userId=<userId>
router.get("/user", async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId)
      return res
        .status(400)
        .json({ message: "User-Id is required", error: true });

    const chat = await Chat.find({ members: { $in: [userId] } });
    if (chat.length > 0) return res.status(200).json(chat);
    return res.status(404).json({ message: "Not Chat Found", error: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
