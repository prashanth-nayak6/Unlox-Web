const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization || '';
  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      message: 'Authorization token is required',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'blog-api-secret');
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}

module.exports = authenticateToken;
