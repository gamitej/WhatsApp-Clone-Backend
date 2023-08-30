const router = require("express").Router();
const {
  uploadProfilePicture,
  getProfilePic,
} = require("../controller/user.controller");

/**
 * @swagger
 * /api/v1/profile-pic:
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
 *     responses:
 *       200:
 *         description: Successfully retrieved user's profile picture URL
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get("/profile-pic", getProfilePic);

/**
 * @swagger
 * /api/v1/upload-profile-pic:
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
 *     responses:
 *       200:
 *         description: Successfully updated user's profile picture
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post("/upload-profile-pic", uploadProfilePicture);

module.exports = router;
