const Chat = require("../modals/Chat");

const createChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.body;

    if (!firstId && !secondId)
      return res
        .status(404)
        .json({ message: "Please provide both id's", error: true });

    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const creatNewChat = new Chat({
      members: [firstId, secondId],
    });

    const response = await creatNewChat.save();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

// find particular user chat - /user?userId=<userId>
const userChat = async (req, res) => {
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
};

module.exports = { createChat, userChat };
