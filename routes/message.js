const router = require("express").Router();
const {
  createMessage,
  getMessageById,
} = require("../controller/message.controller");
const Message = require("../modals/Message");

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API endpoints for managing chat messages
 */

/**
 * @swagger
 * /api/v1/message/create:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *               senderId:
 *                 type: string
 *               message:
 *                 type: string
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token (Bearer token)
 *     responses:
 *       200:
 *         description: Successfully created a new message
 *       403:
 *         description: Missing or incomplete information provided
 *       500:
 *         description: Internal server error
 */

router.post("/create", createMessage);

/**
 * @swagger
 * /api/v1/message/{chatId}:
 *   get:
 *     summary: Retrieve messages by chatId
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to retrieve messages from
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token (Bearer token)
 *     responses:
 *       200:
 *         description: Successfully retrieved messages
 *       500:
 *         description: Internal server error
 */

router.get("/:chatId", getMessageById);

module.exports = router;
