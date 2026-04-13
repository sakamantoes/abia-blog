import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';

const AdminCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await api.get('/comments/all');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await api.delete(`/comments/${id}`);
        setComments(comments.filter(comment => comment.id !== id));
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Comments</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md truncate">{comment.content}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{comment.User?.name}</div>
                  <div className="text-xs text-gray-500">{comment.User?.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{comment.Post?.title}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCommentsPage;