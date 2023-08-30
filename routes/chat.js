const router = require("express").Router();
const { createChat, userChat } = require("../controller/chat.controller");

// create chat
router.post("/create", createChat);

/**
 * @swagger
 * /api/v1/chat/user:
 *   get:
 *     summary: Find chats for a particular user
 *     tags: [Chats]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to find chats for
 *     responses:
 *       200:
 *         description: Successfully retrieved chats
 *       400:
 *         description: Missing or invalid User-Id
 *       404:
 *         description: No chats found for the user
 *       500:
 *         description: Internal server error
 */

router.get("/user", userChat);

module.exports = router;
