import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiFileText, 
  FiMap, 
  FiUser, 
  FiLogOut, 
  FiLogIn, 
  FiUserPlus,
  FiChevronDown 
} from 'react-icons/fi';

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsMobileMenuOpen(false);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/blog', label: 'Blog', icon: FiFileText },
    { path: '/map', label: 'Map', icon: FiMap },
  ];

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  // Show loading state with animation
  if (loading) {
    return (
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="bg-gradient-to-r from-green-700 to-green-800 text-white shadow-xl z-100"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                Abia State Blog
              </Link>
            </motion.div>
            <motion.div 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-green-200"
            >
              Loading...
            </motion.div>
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <>
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="bg-gradient-to-r from-green-700 to-green-800 text-white shadow-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link to="/" className="text-xl sm:text-2xl font-bold">
                <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                  Abia State
                </span>
                <span className="text-yellow-400"> Blog</span>
              </Link>
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 bg-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={link.path} 
                    className="flex items-center gap-2 hover:text-green-200 transition-colors duration-200 group"
                  >
                    <link.icon className="text-lg group-hover:rotate-6 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              {!user ? (
                // Show when logged OUT
                <>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/login" 
                      className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-green-900 px-5 py-2 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg"
                    >
                      <FiLogIn className="text-lg" />
                      Login
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/register" 
                      className="flex items-center gap-2 border-2 border-white px-5 py-2 rounded-lg hover:bg-white hover:text-green-700 transition-all"
                    >
                      <FiUserPlus className="text-lg" />
                      Register
                    </Link>
                  </motion.div>
                </>
              ) : (
                // Show when logged IN
                <div className="relative">
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-opacity-20 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-black">{user.name}</span>
                    <FiChevronDown className={`transition-transform duration-300 text-black ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl overflow-hidden z-50"
                      >
                        <div className="py-2">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm text-gray-500">Signed in as</p>
                            <p className="font-semibold text-gray-800">{user.email}</p>
                            {user.role === 'admin' && (
                              <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Administrator
                              </span>
                            )}
                          </div>
                          
                          {user.role === 'admin' && (
                            <motion.button
                              whileHover={{ x: 5 }}
                              onClick={() => handleNavigation('/admin')}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700"
                            >
                              <FiUser className="text-lg" />
                              <span>Admin Dashboard</span>
                            </motion.button>
                          )}
                          
                          <motion.button
                            whileHover={{ x: 5 }}
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600 border-t border-gray-100"
                          >
                            <FiLogOut className="text-lg" />
                            <span>Logout</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-green-500 hover:bg-opacity-10 transition-colors"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-green-700 to-green-800 shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="text-white">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <p className="text-green-200 text-sm">Navigate around</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white bg-opacity-10 text-green-400 hover:bg-opacity-20 transition-colors"
                  >
                    <FiX size={24} />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <motion.button
                      key={link.path}
                      variants={mobileItemVariants}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavigation(link.path)}
                      className="w-full flex items-center gap-4 text-white hover:text-green-200 transition-colors p-3 rounded-lg hover:bg-white hover:bg-opacity-10"
                    >
                      <link.icon className="text-2xl" />
                      <span className="text-lg font-medium">{link.label}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="my-8 h-px bg-white bg-opacity-20" />

                {/* Auth Section for Mobile */}
                {!user ? (
                  <div className="space-y-3">
                    <motion.button
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleNavigation('/login')}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-green-900 px-5 py-3 rounded-lg font-semibold"
                    >
                      <FiLogIn className="text-xl" />
                      Login
                    </motion.button>
                    <motion.button
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleNavigation('/register')}
                      className="w-full flex items-center justify-center gap-3 border-2 border-white text-white px-5 py-3 rounded-lg font-semibold"
                    >
                      <FiUserPlus className="text-xl" />
                      Register
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-green-400">{user.name}</p>
                          <p className="text-sm text-green-300">{user.email}</p>
                          {user.role === 'admin' && (
                            <span className="inline-block mt-1 text-xs bg-yellow-500 text-green-900 px-2 py-0.5 rounded-full">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {user.role === 'admin' && (
                      <motion.button
                        variants={mobileItemVariants}
                        whileHover={{ x: 10 }}
                        onClick={() => handleNavigation('/admin')}
                        className="w-full flex items-center gap-3 text-white p-3 rounded-lg hover:bg-white hover:bg-opacity-10"
                      >
                        <FiUser className="text-xl" />
                        <span>Admin Dashboard</span>
                      </motion.button>
                    )}
                    
                    <motion.button
                      variants={mobileItemVariants}
                      whileHover={{ x: 10 }}
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 text-red-300 p-3 rounded-lg hover:bg-red-500 hover:bg-opacity-20"
                    >
                      <FiLogOut className="text-xl" />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;