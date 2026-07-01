const generateId = require('../utils/generateId');
const { readPosts, writePosts } = require('../services/fileService');

function buildPaginationResponse(posts, page, limit) {
  const totalPosts = posts.length;
  const totalPages = totalPosts === 0 ? 0 : Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;

  return {
    totalPosts,
    currentPage: page,
    totalPages,
    posts: posts.slice(startIndex, startIndex + limit),
  };
}

async function createPost(req, res, next) {
  try {
    const posts = await readPosts();
    const newPost = {
      id: generateId(),
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      category: req.body.category,
      createdDate: new Date().toISOString(),
    };

    posts.push(newPost);
    await writePosts(posts);

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost,
    });
  } catch (error) {
    return next(error);
  }
}

async function getAllPosts(req, res, next) {
  try {
    const posts = await readPosts();
    const { page, limit } = req.query;

    if (page === undefined && limit === undefined) {
      return res.status(200).json({
        success: true,
        message: 'Posts retrieved successfully',
        count: posts.length,
        data: posts,
      });
    }

    const parsedPage = page === undefined ? 1 : Number.parseInt(page, 10);
    const parsedLimit = limit === undefined ? 5 : Number.parseInt(limit, 10);

    if (
      !Number.isInteger(parsedPage) ||
      !Number.isInteger(parsedLimit) ||
      parsedPage < 1 ||
      parsedLimit < 1
    ) {
      return res.status(400).json({
        success: false,
        message: 'Page and limit must be positive integers',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Posts retrieved successfully',
      ...buildPaginationResponse(posts, parsedPage, parsedLimit),
    });
  } catch (error) {
    return next(error);
  }
}

async function getPostById(req, res, next) {
  try {
    const posts = await readPosts();
    const post = posts.find((item) => item.id === req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post retrieved successfully',
      data: post,
    });
  } catch (error) {
    return next(error);
  }
}

async function updatePost(req, res, next) {
  try {
    const posts = await readPosts();
    const postIndex = posts.findIndex((item) => item.id === req.params.id);

    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const updatedPost = {
      ...posts[postIndex],
      ...req.body,
    };

    posts[postIndex] = updatedPost;
    await writePosts(posts);

    return res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    return next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const posts = await readPosts();
    const postIndex = posts.findIndex((item) => item.id === req.params.id);

    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const [deletedPost] = posts.splice(postIndex, 1);
    await writePosts(posts);

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: deletedPost,
    });
  } catch (error) {
    return next(error);
  }
}

async function searchPosts(req, res, next) {
  try {
    const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query q is required',
      });
    }

    const normalizedQuery = query.toLowerCase();
    const posts = await readPosts();

    const results = posts.filter((post) => {
      const searchableText = [post.title, post.content, post.author, post.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });

    return res.status(200).json({
      success: true,
      message: 'Search results retrieved successfully',
      query,
      totalMatches: results.length,
      data: results,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
};
