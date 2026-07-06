import { useState } from 'react';

const PostForm = ({ initialContent = '', initialImage = '', onSubmit, submitLabel = 'Post', onCancel }) => {
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialImage ? `http://localhost:5000${initialImage}` : '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) formData.append('image', image);

      await onSubmit(formData);
      setContent('');
      setImage(null);
      setPreview('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 border border-gray-200 dark:border-gray-700"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={3}
        className="w-full resize-none rounded-md border border-gray-300 dark:border-gray-600 bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      {preview && (
        <img src={preview} alt="preview" className="mt-3 rounded-md max-h-64 object-cover" />
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex items-center justify-between mt-3">
        <label className="cursor-pointer text-sm text-primary-600 hover:underline">
          📷 Add Image
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-1.5 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {submitting ? 'Saving...' : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
