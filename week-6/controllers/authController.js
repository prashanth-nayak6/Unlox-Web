const jwt = require('jsonwebtoken');

function login(req, res) {
  const username = typeof req.body.username === 'string' ? req.body.username.trim() : '';
  const password = typeof req.body.password === 'string' ? req.body.password.trim() : '';

  if (!username) {
    return res.status(400).json({
      success: false,
      message: 'Username is required',
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Password is required',
    });
  }

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin@example.com';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'password123';

  if (username !== expectedUsername || password !== expectedPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  const token = jwt.sign(
    {
      username: expectedUsername,
      role: 'admin',
    },
    process.env.JWT_SECRET || 'blog-api-secret',
    { expiresIn: '1h' }
  );

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
  });
}

module.exports = { login };
