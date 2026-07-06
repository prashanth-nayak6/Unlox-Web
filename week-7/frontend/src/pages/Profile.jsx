import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = currentUser && currentUser.id === id;
  const isFollowing = profile?.followers?.some((f) => f._id === currentUser?.id);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/users/${id}`);
      setProfile(data.user);

      const postsRes = await api.get('/posts');
      const userPosts = postsRes.data.posts.filter((p) => p.author?._id === id);
      setPosts(userPosts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFollowToggle = async () => {
    try {
      const endpoint = isFollowing ? 'unfollow' : 'follow';
      await api.post(`/users/${id}/${endpoint}`);
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (updatedPost) => {
    setPosts((prev) => prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  };

  const handleDelete = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading profile...</p>;
  if (!profile) return <p className="text-center mt-10 text-gray-400">User not found</p>;

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={
              profile.profilePicture
                ? `${API_BASE}${profile.profilePicture}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}`
            }
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-xl font-bold">{profile.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
            <div className="flex gap-4 text-sm mt-1">
              <span>
                <strong>{profile.followers?.length || 0}</strong> Followers
              </span>
              <span>
                <strong>{profile.following?.length || 0}</strong> Following
              </span>
            </div>
          </div>

          {isOwnProfile ? (
            <Link
              to="/edit-profile"
              className="text-sm px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Edit Profile
            </Link>
          ) : (
            <button
              onClick={handleFollowToggle}
              className={`text-sm px-3 py-1.5 rounded-md ${
                isFollowing
                  ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>

        {profile.bio && <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{profile.bio}</p>}
      </div>

      <h2 className="text-lg font-semibold mb-3">Posts</h2>
      {posts.length === 0 && <p className="text-gray-400 text-sm">No posts yet.</p>}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onUpdate={handleUpdate} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Profile;
