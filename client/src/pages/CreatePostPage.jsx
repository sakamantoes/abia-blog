import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../services/api';
import { FiImage, FiPlus, FiX, FiUpload, FiArrowLeft } from 'react-icons/fi';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only JPEG, PNG, GIF, and WEBP images are allowed');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    if (!content.trim()) {
      setError('Please enter content');
      return;
    }
    
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSuccess('Post created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  // Quill toolbar options
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'clean'],
      [{ 'color': [] }, { 'background': [] }],
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header with back button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Post</h1>
              <p className="text-gray-600">Share news, updates, and information with the community</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-green-100 rounded-full p-3">
                <FiPlus className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg shadow-sm animate-slide-down">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Post Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title..."
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">Make it clear and descriptive (max 200 characters)</p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Featured Image
              </label>
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                     onClick={() => document.getElementById('imageInput').click()}>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={loading}
                  />
                  <FiImage className="mx-auto text-4xl text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-2">Click to upload a featured image</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                    disabled={loading}
                  >
                    <FiX />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    Featured Image
                  </div>
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Post Content <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  theme="snow"
                  className="h-80"
                  readOnly={loading}
                  placeholder="Write your post content here..."
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Use the toolbar to format your content</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-medium flex items-center justify-center gap-2"
                disabled={loading}
              >
                <FiX className="text-lg" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Post...
                  </>
                ) : (
                  <>
                    <FiUpload className="text-lg" />
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tips for Great Posts</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>✓ Use clear, descriptive titles</div>
            <div>✓ Add high-quality images</div>
            <div>✓ Break content into sections</div>
            <div>✓ Include relevant links</div>
            <div>✓ Proofread before publishing</div>
            <div>✓ Engage with comments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;