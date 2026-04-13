import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <nav className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold">
              Abia State Blog
            </Link>
            <div className="text-green-200">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            Abia State Blog
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-green-200 transition">Home</Link>
            <Link to="/blog" className="hover:text-green-200 transition">Blog</Link>
            <Link to="/map" className="hover:text-green-200 transition">Map</Link>
            
            {!user ? (
              // Show when logged OUT
              <>
                <Link to="/login" className="bg-yellow-500 text-green-900 px-4 py-2 rounded hover:bg-yellow-400 transition">
                  Login
                </Link>
                <Link to="/register" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-green-700 transition">
                  Register
                </Link>
              </>
            ) : (
              // Show when logged IN
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-green-200 transition">Admin</Link>
                )}
                <span className="text-green-200">Welcome, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;