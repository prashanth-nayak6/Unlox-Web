const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authenticate and receive a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing credentials
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

module.exports = router;
