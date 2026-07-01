const { randomUUID } = require('crypto');

function generateId() {
  if (typeof randomUUID === 'function') {
    return randomUUID();
  }

  return `post_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

module.exports = generateId;
