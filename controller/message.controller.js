const Message = require("../modals/Message");

const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, message } = req.body;

    if (!chatId || !senderId || !message)
      return res
        .status(403)
        .json({ message: "PLease send complete info", error: true });

    const msg = new Message({ chatId, senderId, message });

    const response = await msg.save();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessageById = async (req, res) => {
  try {
    const { chatId } = req.params;

    console.log(chatId);

    const message = await Message.find({ chatId });
    return res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessageById };
