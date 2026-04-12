import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-green-200 transition">Admin</Link>
                )}
                <span className="text-green-200">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="hover:text-green-200 transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-200 transition">Login</Link>
                <Link to="/register" className="hover:text-green-200 transition">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;