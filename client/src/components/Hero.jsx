import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay, FiMapPin } from 'react-icons/fi';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0, rotate: 5 },
    visible: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        delay: 0.5,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-900 via-green-700 to-emerald-800">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundBlendMode: 'overlay',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-emerald-900/90" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium">Official Government Platform</span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Abia State
              </span>
              <br />
              Digital Hub
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl mb-8 text-gray-100 max-w-2xl lg:mx-0 mx-auto"
            >
              Your official source for news, updates, tourism, and public engagement. 
              Stay connected with the God's Own State.
            </motion.p>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">50+</div>
                <div className="text-sm text-gray-200">News Updates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">100+</div>
                <div className="text-sm text-gray-200">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-gray-200">Support</div>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-500 text-green-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Abia
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 px-8 py-4 rounded-xl font-semibold text-white text-lg transition-all border border-white/30"
              >
                <FiPlay className="text-yellow-400" />
                Watch Video
              </motion.button>
            </motion.div>

            {/* Location Info */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-gray-200 text-sm"
            >
              <FiMapPin className="text-yellow-400" />
              <span>God's Own State, Nigeria</span>
            </motion.div>
          </motion.div>

          {/* Right Image/Illustration */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="hidden w-[500px] lg:block left-24 relative"
          >
            <motion.div 
              animate={floatingAnimation}
              className="relative z-10"
            >
              <div className="relative">
                {/* Main Image Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7wWND6xn0oEJHxNNjNHd2pkIP2Ju09Es2UA&s"
                    alt="Abia State Cultural Display"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent" />
                </div>

                {/* Floating Card 1 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute -top-10 -right-10 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl max-w-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🏛️</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Government House</p>
                      <p className="text-xs text-gray-600">Umuahia, Abia State</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                  className="absolute -bottom-10 -left-10 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🌊</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Azumini Blue River</p>
                      <p className="text-xs text-gray-600">Top Tourist Destination</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-30" />
                <div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-30" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="flex flex-col items-center gap-2 text-white/80 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              className="w-1.5 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;