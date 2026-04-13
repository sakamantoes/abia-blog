import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/post/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment');
      return;
    }
    
    try {
      const response = await api.post('/comments', {
        content: newComment,
        postId
      });
      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const response = await api.put(`/comments/${commentId}`, {
        content: editContent
      });
      setComments(comments.map(c => 
        c.id === commentId ? response.data : c
      ));
      setEditingComment(null);
      setEditContent('');
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await api.delete(`/comments/${commentId}`);
        setComments(comments.filter(c => c.id !== commentId));
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const startEdit = (comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  if (loading) return <div className="text-center py-4">Loading comments...</div>;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Comments ({comments.length})</h3>
      
      {user ? (
        <form onSubmit={handleAddComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600"
          />
          <button
            type="submit"
            className="mt-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-gray-600 mb-4">Please login to comment</p>
      )}
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold text-gray-800">{comment.User?.name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              {(user?.id === comment.userId || user?.role === 'admin') && (
                <div className="space-x-2">
                  {user?.id === comment.userId && (
                    <button
                      onClick={() => startEdit(comment)}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            
            {editingComment === comment.id ? (
              <div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="2"
                />
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEditComment(comment.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingComment(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">{comment.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;