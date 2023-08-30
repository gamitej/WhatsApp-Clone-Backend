const router = require("express").Router();
const { createChat, userChat } = require("../controller/chat.controller");

/**
 * @swagger
 * /api/v1/chat/create:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstId:
 *                 type: string
 *               secondId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created a new chat or retrieved existing chat
 *       404:
 *         description: Both user IDs are required or chat not found
 *       500:
 *         description: Internal server error
 */

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
