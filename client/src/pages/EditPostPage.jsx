import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../services/api';
import Loader from '../components/Loader';

const EditPostPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
      const existingImage = response.data.image || response.data.imageUrl || '';
      setCurrentImageUrl(existingImage);
      setImagePreview(existingImage);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      
      await api.put(`/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Post</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 h-48 object-cover rounded" />
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            className="h-64 mb-12"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;