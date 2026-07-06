import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const CommentList = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const { data } = await api.get(`/posts/${postId}/comments`);
      setComments(data.comments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const { data } = await api.post(`/posts/${postId}/comments`, { text });
      setComments((prev) => [...prev, data.comment]);
      setText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-3 border-t border-gray-100 dark:border-gray-700 pt-3">
      {loading ? (
        <p className="text-xs text-gray-400">Loading comments...</p>
      ) : (
        <div className="space-y-2 mb-3">
          {comments.map((comment) => (
            <div key={comment._id} className="flex justify-between items-start text-sm">
              <div>
                <Link to={`/profile/${comment.author._id}`} className="font-medium hover:underline">
                  {comment.author.name}
                </Link>
                <span className="ml-2 text-gray-700 dark:text-gray-300">{comment.text}</span>
              </div>
              {user && comment.author._id === user.id && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="text-xs text-red-500 hover:underline ml-2"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-xs text-gray-400">No comments yet. Be the first!</p>
          )}
        </div>
      )}

      <form onSubmit={handleAddComment} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="text-sm px-3 py-1.5 rounded-md bg-primary-600 text-white hover:bg-primary-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default CommentList;
