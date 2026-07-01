const express = require('express');
const authenticateToken = require('../middleware/authenticate');
const validatePost = require('../middleware/validatePost');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
} = require('../controllers/postController');

const router = express.Router();

/**
 * @openapi
 * /posts/search:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Search posts by title, content, author, or category
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         example: react
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Missing query parameter
 */
router.get('/search', searchPosts);

/**
 * @openapi
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts or paginated posts
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 5
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 */
router.get('/', getAllPosts);

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get a single post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 */
router.get('/:id', getPostById);

/**
 * @openapi
 * /posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new blog post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Building REST APIs with Express
 *               content:
 *                 type: string
 *                 example: Express makes REST API development simple and scalable.
 *               author:
 *                 type: string
 *                 example: Prashanth
 *               category:
 *                 type: string
 *                 example: Node.js
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, validatePost, createPost);

/**
 * @openapi
 * /posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Update an existing post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.put('/:id', authenticateToken, validatePost, updatePost);

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete a post by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.delete('/:id', authenticateToken, deletePost);

module.exports = router;
