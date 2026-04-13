import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import Loader from '../components/Loader';
import LikeButton from '../components/LikeButton';
import CommentSection from '../components/CommentSection';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiUser, 
  FiShare2, 
  FiBookmark, 
  FiEye,
  FiHeart,
  FiMessageCircle,
  FiChevronRight
} from 'react-icons/fi';

import { MdBookmarkBorder } from 'react-icons/md'; // ✅ CORRECT

const SinglePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    fetchPost();
    // Check if post is bookmarked in localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    setIsBookmarked(bookmarks.includes(parseInt(id)));
  }, [id]);

  useEffect(() => {
    // Track reading progress
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
      // Increment view count (optional - you can add this to backend)
      document.title = `${response.data.title} - Abia State Blog`;
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    let newBookmarks;
    
    if (isBookmarked) {
      newBookmarks = bookmarks.filter(b => b !== parseInt(id));
    } else {
      newBookmarks = [...bookmarks, parseInt(id)];
    }
    
    localStorage.setItem('bookmarkedPosts', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = post.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Check out this post: ${shareTitle}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const imageVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  const floatingButtonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
    hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 }
  };

  if (loading) return <Loader />;
  if (!post) return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-4"
        >
          📖
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h2>
        <p className="text-gray-600 mb-4">The article you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/blog')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Browse Articles
        </button>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 z-50"
        style={{ width: `${readingProgress}%`, transformOrigin: '0%' }}
        initial={{ width: 0 }}
        animate={{ width: `${readingProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        <motion.button
          variants={floatingButtonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          onClick={handleBookmark}
          className="bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
        >
          {isBookmarked ? (
            <MdBookmarkBorder className="text-green-600 text-xl" />
          ) : (
            <FiBookmark className="text-gray-600 text-xl" />
          )}
        </motion.button>
        
        <motion.button
          variants={floatingButtonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          onClick={handleShare}
          className="bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all relative"
        >
          <FiShare2 className="text-gray-600 text-xl" />
          <AnimatePresence>
            {showShareTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap"
              >
                Link copied!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('/blog')}
        className="fixed top-24 left-4 md:left-8 z-40 bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition-all group"
      >
        <FiArrowLeft className="text-gray-600 text-xl group-hover:-translate-x-1 transition-transform" />
      </motion.button>

      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4"
      >
        <div className="container mx-auto max-w-5xl">
          {/* Hero Section with Image */}
          {post.imageUrl && (
            <motion.div 
              variants={imageVariants}
              initial="initial"
              animate="animate"
              className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 -mt-4"
            >
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-[50vh] md:h-[60vh] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
              {/* Image Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-green-600 text-xs px-3 py-1 rounded-full">Featured Article</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{post.title}</h1>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Content Card */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 md:p-8 lg:p-10">
              {/* Post Metadata */}
              <motion.div 
                custom={0}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b-2 border-gray-100"
              >
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-2">
                      <FiUser className="text-white text-sm" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">{post.User?.name}</span>
                      <span className="text-xs text-gray-500 block">Author</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-green-600" />
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FiEye className="text-green-600" />
                    <span>{Math.floor(Math.random() * 500) + 100} views</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FiHeart className="text-green-600" />
                    <span>{post.likeCount} likes</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FiMessageCircle className="text-green-600" />
                    <span>{post.commentCount} comments</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleBookmark}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    {isBookmarked ? (
                      <>
                        <MdBookmarkBorder className="text-green-600" />
                        <span className="text-sm">Saved</span>
                      </>
                    ) : (
                      <>
                        <FiBookmark />
                        <span className="text-sm">Save</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    <FiShare2 />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </motion.div>

              {/* Post Content */}
              <motion.div 
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Post Footer Actions */}
              <motion.div 
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center justify-between gap-6 mt-12 pt-8 border-t-2 border-gray-100"
              >
                <LikeButton postId={post.id} />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition group"
                  >
                    <span>Join Discussion</span>
                    <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* Tags Section (Optional) */}
              <motion.div 
                custom={3}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="mt-8 pt-6 border-t border-gray-100"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500 mr-2">Tags:</span>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">Abia State</span>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">News</span>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">Development</span>
                </div>
              </motion.div>

              {/* Comments Section */}
              <motion.div
                custom={4}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="mt-12"
              >
                <CommentSection postId={post.id} />
              </motion.div>
            </div>
          </motion.article>

          {/* Related Posts Section (Optional) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Enjoyed this article?</h3>
              <p className="text-gray-600 mb-4">Discover more stories about Abia State's progress and culture</p>
              <button
                onClick={() => navigate('/blog')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition inline-flex items-center gap-2"
              >
                Browse More Articles
                <FiChevronRight />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default SinglePostPage;