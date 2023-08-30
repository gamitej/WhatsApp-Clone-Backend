const router = require("express").Router();
const { userLogin, registerUser } = require("../controller/auth.controller");

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid input or missing credentials
 *       401:
 *         description: Invalid credentials or token missing
 *       500:
 *         description: Internal server error
 */

router.post("/login", userLogin);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Invalid input or missing credentials
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

router.post("/register", registerUser);

module.exports = router;
