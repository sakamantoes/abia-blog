import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiMessageCircle, 
  FiEdit2, 
  FiTrash2, 
  FiCalendar, 
  FiHeart, 
  FiMessageSquare,
  FiBarChart2,
  FiUsers,
  FiTrendingUp,
  FiSearch,
  FiChevronRight
} from 'react-icons/fi';
import api from '../services/api';
import Loader from '../components/Loader';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setDeletingId(id);
      try {
        await api.delete(`/posts/${id}`);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Calculate statistics
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + (post.likeCount || 0), 0);
  const totalComments = posts.reduce((sum, post) => sum + (post.commentCount || 0), 0);
  const avgEngagement = totalPosts > 0 ? ((totalLikes + totalComments) / totalPosts).toFixed(1) : 0;

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedFilter === 'popular') return matchesSearch && (post.likeCount > 10);
    if (selectedFilter === 'recent') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return matchesSearch && new Date(post.createdAt) > weekAgo;
    }
    return matchesSearch;
  });

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

  const statCardVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your blog posts and monitor engagement</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/admin/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <FiPlus className="text-xl" />
                  Create New Post
                </motion.button>
              </Link>
              <Link to="/admin/comments">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <FiMessageCircle className="text-xl" />
                  Manage Comments
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              icon: FiBarChart2, 
              label: 'Total Posts', 
              value: totalPosts,
              color: 'from-blue-500 to-blue-600',
              bgColor: 'bg-blue-100'
            },
            { 
              icon: FiHeart, 
              label: 'Total Likes', 
              value: totalLikes,
              color: 'from-red-500 to-red-600',
              bgColor: 'bg-red-100'
            },
            { 
              icon: FiMessageSquare, 
              label: 'Total Comments', 
              value: totalComments,
              color: 'from-purple-500 to-purple-600',
              bgColor: 'bg-purple-100'
            },
            { 
              icon: FiTrendingUp, 
              label: 'Avg Engagement', 
              value: avgEngagement,
              suffix: '/post',
              color: 'from-green-500 to-green-600',
              bgColor: 'bg-green-100'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              variants={statCardVariants}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon className={`text-2xl text-${stat.color.split('-')[1]}-600`} />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-gray-300"
                >
                  <FiChevronRight />
                </motion.div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-900">
                {stat.value}{stat.suffix || ''}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search posts by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              {['all', 'recent', 'popular'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilter === filter
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts Table */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {filteredPosts.length === 0 ? (
            <motion.div 
              variants={itemVariants}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <FiBarChart2 className="text-6xl mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
              <p className="text-gray-500">Create your first post to get started</p>
              <Link to="/admin/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Create Post
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Post Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Engagement</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredPosts.map((post, index) => (
                        <motion.tr
                          key={post.id}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ backgroundColor: "#f9fafb" }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-semibold text-gray-900 mb-1">{post.title}</div>
                              {post.imageUrl && (
                                <div className="text-xs text-gray-500">Has featured image</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <FiCalendar className="mr-2" />
                              {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center text-red-500">
                                <FiHeart className="mr-1" />
                                <span className="text-sm font-medium">{post.likeCount || 0}</span>
                              </div>
                              <div className="flex items-center text-blue-500">
                                <FiMessageSquare className="mr-1" />
                                <span className="text-sm font-medium">{post.commentCount || 0}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Link to={`/admin/edit/${post.id}`}>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-blue-600 hover:text-blue-700 transition p-2 rounded-lg hover:bg-blue-50"
                                >
                                  <FiEdit2 className="text-lg" />
                                </motion.button>
                              </Link>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(post.id)}
                                disabled={deletingId === post.id}
                                className="text-red-600 hover:text-red-700 transition p-2 rounded-lg hover:bg-red-50 disabled:opacity-50"
                              >
                                {deletingId === post.id ? (
                                  <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <FiTrash2 className="text-lg" />
                                )}
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden">
                <AnimatePresence>
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <FiCalendar className="mr-2" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center text-red-500">
                            <FiHeart className="mr-1" />
                            <span className="text-sm">{post.likeCount || 0} likes</span>
                          </div>
                          <div className="flex items-center text-blue-500">
                            <FiMessageSquare className="mr-1" />
                            <span className="text-sm">{post.commentCount || 0} comments</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link to={`/admin/edit/${post.id}`} className="flex-1">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                          >
                            <FiEdit2 />
                            Edit
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {deletingId === post.id ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <FiTrash2 />
                              Delete
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>

        {/* Footer Stats */}
        {filteredPosts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center text-sm text-gray-500"
          >
            Showing {filteredPosts.length} of {posts.length} posts
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;