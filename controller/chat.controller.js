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

module.exports = { createChat };
