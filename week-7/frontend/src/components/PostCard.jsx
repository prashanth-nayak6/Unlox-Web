import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import PostForm from './PostForm';
import CommentList from './CommentList';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

const timeAgo = (dateString) => {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  const intervals = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [label, secs] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
};

const PostCard = ({ post, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes || []);

  const isOwner = user && post.author && user.id === post.author._id;
  const isLiked = user && likes.includes(user.id);

  const handleLikeToggle = async () => {
    try {
      const endpoint = isLiked ? 'unlike' : 'like';
      const { data } = await api.post(`/posts/${post._id}/${endpoint}`);
      setLikes(data.likes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (formData) => {
    const { data } = await api.put(`/posts/${post._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    onUpdate(data.post);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    await api.delete(`/posts/${post._id}`);
    onDelete(post._id);
  };

  if (isEditing) {
    return (
      <PostForm
        initialContent={post.content}
        initialImage={post.image}
        submitLabel="Save"
        onSubmit={handleEdit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <img
            src={
              post.author?.profilePicture
                ? `${API_BASE}${post.author.profilePicture}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'U')}`
            }
            alt={post.author?.name}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <Link to={`/profile/${post.author?._id}`} className="font-semibold text-sm hover:underline">
              {post.author?.name}
            </Link>
            <p className="text-xs text-gray-400">{timeAgo(post.createdAt)}</p>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2 text-xs">
            <button onClick={() => setIsEditing(true)} className="text-primary-600 hover:underline">
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-500 hover:underline">
              Delete
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 whitespace-pre-wrap text-sm">{post.content}</p>

      {post.image && (
        <img src={`${API_BASE}${post.image}`} alt="post" className="mt-3 rounded-md max-h-96 w-full object-cover" />
      )}

      <div className="flex items-center gap-4 mt-3 text-sm">
        <button
          onClick={handleLikeToggle}
          className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
        >
          {isLiked ? '❤️' : '🤍'} {likes.length}
        </button>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="text-gray-500 dark:text-gray-400 hover:text-primary-600"
        >
          💬 Comments
        </button>
      </div>

      {showComments && <CommentList postId={post._id} />}
    </div>
  );
};

export default PostCard;
