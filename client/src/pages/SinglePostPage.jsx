import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import LikeButton from '../components/LikeButton';
import CommentSection from '../components/CommentSection';

const SinglePostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-96 object-cover"
          />
        )}
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          
          <div className="flex justify-between items-center text-gray-500 mb-6 pb-4 border-b">
            <span>By {post.User?.name}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div 
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="flex items-center space-x-6 pt-4 border-t">
            <LikeButton postId={post.id} />
          </div>
          
          <CommentSection postId={post.id} />
        </div>
      </article>
    </div>
  );
};

export default SinglePostPage;