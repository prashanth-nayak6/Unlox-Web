const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} = require('../controllers/postController');
const { addComment, getCommentsForPost } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/').post(protect, upload.single('image'), createPost).get(protect, getAllPosts);

router
  .route('/:id')
  .get(protect, getPostById)
  .put(protect, upload.single('image'), updatePost)
  .delete(protect, deletePost);

router.post('/:id/like', protect, likePost);
router.post('/:id/unlike', protect, unlikePost);

router.route('/:postId/comments').post(protect, addComment).get(protect, getCommentsForPost);

module.exports = router;
