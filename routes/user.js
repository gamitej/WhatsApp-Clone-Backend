const router = require("express").Router();
const {
  uploadProfilePicture,
  getProfilePic,
} = require("../controller/user.controller");

/**
 * @swagger
 * /api/v1/user/profile-pic:
 *   get:
 *     summary: Get user's profile picture URL
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve profile picture URL for
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token (Bearer token)
 *     responses:
 *       200:
 *         description: Successfully retrieved user's profile picture URL
 *       401:
 *         description: Unauthorized (JWT token missing or invalid)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get("/profile-pic", getProfilePic);

/**
 * @swagger
 * /api/v1/user/upload-profile-pic:
 *   post:
 *     summary: Upload and update user's profile picture
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               profilePicUrl:
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
 *         description: Successfully updated user's profile picture
 *       401:
 *         description: Unauthorized (JWT token missing or invalid)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post("/upload-profile-pic", uploadProfilePicture);

module.exports = router;
