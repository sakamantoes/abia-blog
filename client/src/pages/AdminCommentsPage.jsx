import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMessageSquare, FiUser, FiCalendar, FiFileText, FiSearch, FiX, FiAlertCircle } from 'react-icons/fi';
import api from '../services/api';
import Loader from '../components/Loader';

const AdminCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    // Filter comments based on search term
    if (searchTerm.trim() === '') {
      setFilteredComments(comments);
    } else {
      const filtered = comments.filter(comment => 
        comment.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.User?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.User?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.Post?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredComments(filtered);
    }
  }, [searchTerm, comments]);

  const fetchComments = async () => {
    try {
      const response = await api.get('/comments/all');
      setComments(response.data);
      setFilteredComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setErrorMessage('Failed to load comments');
    } finally {
      setLoading(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/comments/${id}`);
      setComments(comments.filter(comment => comment.id !== id));
      setSuccessMessage('Comment deleted successfully');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting comment:', error);
      setErrorMessage('Failed to delete comment');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  const getCommentPreview = (content, maxLength = 80) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Comments</h1>
              <p className="text-gray-600">Monitor and moderate user comments across all posts</p>
            </div>
            <div className="bg-green-100 rounded-full p-3 self-start md:self-auto">
              <FiMessageSquare className="text-green-600 text-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg shadow-sm"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {successMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg shadow-sm"
            >
              <div className="flex items-center">
                <FiAlertCircle className="w-5 h-5 mr-2" />
                {errorMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Comments</p>
                <p className="text-3xl font-bold text-gray-900">{comments.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <FiMessageSquare className="text-blue-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Unique Commenters</p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Set(comments.map(c => c.userId)).size}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <FiUser className="text-purple-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Posts with Comments</p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Set(comments.map(c => c.postId)).size}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <FiFileText className="text-green-600 text-xl" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search comments by content, user name, email, or post title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX className="text-lg" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Comments Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {filteredComments.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FiMessageSquare className="text-4xl text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No comments found</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-green-600 hover:text-green-700"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Comment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <AnimatePresence>
                    {filteredComments.map((comment, index) => (
                      <motion.tr
                        key={comment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-2">
                            <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                              <FiMessageSquare className="text-blue-600 text-xs" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-900 max-w-md">
                                {getCommentPreview(comment.content, 100)}
                              </div>
                              {comment.content && comment.content.length > 100 && (
                                <p className="text-xs text-gray-400 mt-1">Click to view full comment</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="bg-gray-100 rounded-full p-1">
                              <FiUser className="text-gray-600 text-xs" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{comment.User?.name || 'Unknown'}</div>
                              <div className="text-xs text-gray-500">{comment.User?.email || 'No email'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="bg-purple-100 rounded-full p-1">
                              <FiFileText className="text-purple-600 text-xs" />
                            </div>
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                              {comment.Post?.title || 'Deleted Post'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <FiCalendar className="text-gray-400 text-sm" />
                            <div className="text-sm text-gray-600">
                              {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setDeleteConfirm(comment.id)}
                            className="text-red-600 hover:text-red-700 transition-colors flex items-center space-x-1 group"
                          >
                            <FiTrash2 className="text-lg group-hover:scale-110 transition-transform" />
                            <span className="text-sm">Delete</span>
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Footer Info */}
        {filteredComments.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-center text-sm text-gray-500"
          >
            Showing {filteredComments.length} of {comments.length} comments
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-red-100 rounded-full p-3">
                    <FiAlertCircle className="text-red-600 text-3xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                  Delete Comment
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete this comment? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminCommentsPage;