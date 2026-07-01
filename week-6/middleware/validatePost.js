const blogFields = ['title', 'content', 'author', 'category'];

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function toLabel(field) {
  return field.charAt(0).toUpperCase() + field.slice(1);
}

function validatePost(req, res, next) {
  const body = req.body || {};
  const sanitizedBody = {};
  const errors = [];

  for (const field of blogFields) {
    const hasField = Object.prototype.hasOwnProperty.call(body, field);
    const normalizedValue = normalizeString(body[field]);

    if (req.method === 'POST') {
      if (!hasField || !normalizedValue) {
        errors.push(`${toLabel(field)} is required`);
        continue;
      }

      sanitizedBody[field] = normalizedValue;
      continue;
    }

    if (!hasField) {
      continue;
    }

    if (!normalizedValue) {
      errors.push(`${toLabel(field)} is required`);
      continue;
    }

    sanitizedBody[field] = normalizedValue;
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors[0],
    });
  }

  if (req.method === 'PUT' && Object.keys(sanitizedBody).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one field is required to update a post',
    });
  }

  req.body = sanitizedBody;
  return next();
}

module.exports = validatePost;
