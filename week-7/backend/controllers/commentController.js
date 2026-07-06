const Comment = require('../models/Comment');
const Post = require('../models/Post');

// @desc    Add a comment to a post
// @route   POST /api/posts/:postId/comments
// @access  Private
const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      text,
    });

    const populatedComment = await comment.populate('author', 'name profilePicture');

    res.status(201).json({ success: true, comment: populatedComment });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Private
const getCommentsForPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: 1 })
      .populate('author', 'name profilePicture');

    res.status(200).json({ success: true, count: comments.length, comments });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete own comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this comment' });
    }

    await comment.deleteOne();

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { addComment, getCommentsForPost, deleteComment };
