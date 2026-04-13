import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const LikeButton = ({ postId }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikeStatus();
    fetchLikeCount();
  }, [postId]);

  const fetchLikeStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(`/likes/check/${postId}`);
      setLiked(response.data.liked);
    } catch (error) {
      console.error('Error fetching like status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikeCount = async () => {
    try {
      const response = await api.get(`/likes/count/${postId}`);
      setLikeCount(response.data.count);
    } catch (error) {
      console.error('Error fetching like count:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }
    
    try {
      const response = await api.post('/likes/toggle', { postId });
      setLiked(response.data.liked);
      setLikeCount(prev => response.data.liked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  if (loading) return null;

  return (
    <button
      onClick={handleLike}
      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition"
    >
      {liked ? (
        <FaHeart className="text-red-500 text-xl" />
      ) : (
        <FaRegHeart className="text-xl" />
      )}
      <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
    </button>
  );
};

export default LikeButton;