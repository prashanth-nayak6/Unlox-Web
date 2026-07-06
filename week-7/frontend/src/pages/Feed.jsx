import { useEffect, useState } from 'react';
import api from '../services/api';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/posts');
      setPosts(data.posts);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (formData) => {
    const { data } = await api.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setPosts((prev) => [data.post, ...prev]);
  };

  const handleUpdate = (updatedPost) => {
    setPosts((prev) => prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <PostForm onSubmit={handleCreate} submitLabel="Post" />

      {loading && <p className="text-center text-gray-400">Loading feed...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-400">No posts yet. Be the first to share something!</p>
      )}

      {posts.map((post) => (
        <PostCard key={post._id} post={post} onUpdate={handleUpdate} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Feed;
