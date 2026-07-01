const fs = require('fs/promises');
const path = require('path');

const dataDirectory = path.join(__dirname, '..', 'data');
const postsFilePath = path.join(dataDirectory, 'posts.json');

async function ensureDataFile() {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    await fs.access(postsFilePath);
  } catch {
    await fs.writeFile(postsFilePath, '[]', 'utf8');
  }
}

async function readPosts() {
  await ensureDataFile();

  const fileContent = await fs.readFile(postsFilePath, 'utf8');

  if (!fileContent.trim()) {
    return [];
  }

  const posts = JSON.parse(fileContent);
  return Array.isArray(posts) ? posts : [];
}

async function writePosts(posts) {
  await ensureDataFile();
  await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
  return posts;
}

module.exports = {
  readPosts,
  writePosts,
  postsFilePath,
};
