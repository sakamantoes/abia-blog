import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { FiCalendar, FiUser, FiHeart, FiMessageCircle, FiSearch, FiTrendingUp } from 'react-icons/fi';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [searchTerm, selectedCategory, posts]);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
      setFilteredPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category (you can add categories to posts later)
    if (selectedCategory !== 'all') {
      // This is a placeholder - you can add a category field to posts
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(filtered);
  };

  const handleImageError = (postId) => {
    setImageErrors(prev => ({ ...prev, [postId]: true }));
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📰' },
    { id: 'news', name: 'News', icon: '📡' },
    { id: 'tourism', name: 'Tourism', icon: '🏖️' },
    { id: 'events', name: 'Events', icon: '🎉' },
    { id: 'announcements', name: 'Announcements', icon: '📢' },
  ];

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Latest News & Updates
            </h1>
            <p className="text-lg md:text-xl opacity-95 mb-8">
              Stay informed about Abia State's progress, events, and opportunities
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
            {/* Categories Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center mb-4">
                <FiTrendingUp className="text-green-600 text-xl mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Categories</h3>
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white shadow-md transform scale-105'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-2 text-xl">{category.icon}</span>
                    <span className="flex-1">{category.name}</span>
                    {selectedCategory === category.id && (
                      <span className="text-sm">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-3">Community Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Articles:</span>
                  <span className="font-semibold text-green-600">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Likes:</span>
                  <span className="font-semibold text-green-600">
                    {posts.reduce((sum, post) => sum + (post.likeCount || 0), 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Comments:</span>
                  <span className="font-semibold text-green-600">
                    {posts.reduce((sum, post) => sum + (post.commentCount || 0), 0)}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Info */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-green-600">{filteredPosts.length}</span> of{' '}
                <span className="font-semibold">{posts.length}</span> articles
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Posts Grid */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `No results found for "${searchTerm}"` 
                    : 'No articles available at the moment'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.id} 
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image Container */}
                    <Link to={`/blog/${post.id}`} className="block overflow-hidden bg-gray-200 relative">
                      {post.imageUrl && !imageErrors[post.id] ? (
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={() => handleImageError(post.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-56 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                          <span className="text-white text-6xl">📰</span>
                        </div>
                      )}
                      
                      {/* Overlay gradient for better text readability if needed */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    
                    {/* Content */}
                    <div className="p-6">
                      {/* Metadata */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <FiUser className="mr-1 text-green-600" size={14} />
                          <span>{post.User?.name || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center">
                          <FiCalendar className="mr-1 text-green-600" size={14} />
                          <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}</span>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        <Link to={`/blog/${post.id}`} className="hover:text-green-600 transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {stripHtml(post.content).substring(0, 120)}...
                      </p>
                      
                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex space-x-4">
                          <div className="flex items-center text-gray-500">
                            <FiHeart className="mr-1 text-red-500" size={16} />
                            <span className="text-sm font-medium">{post.likeCount || 0}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <FiMessageCircle className="mr-1 text-blue-500" size={16} />
                            <span className="text-sm font-medium">{post.commentCount || 0}</span>
                          </div>
                        </div>
                        
                        <Link 
                          to={`/blog/${post.id}`}
                          className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center group"
                        >
                          Read More
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More Button (Optional - implement pagination if needed) */}
            {filteredPosts.length >= 6 && filteredPosts.length < posts.length && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-white text-green-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:bg-green-50 border-2 border-green-600">
                  Load More Articles
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;