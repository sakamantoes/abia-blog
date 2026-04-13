import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { number: "50+", label: "News Updates", icon: "📰" },
    { number: "1000+", label: "Active Users", icon: "👥" },
    { number: "24/7", label: "Support", icon: "🕐" },
    { number: "17", label: "LGAs Covered", icon: "🏛️" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block bg-green-100 rounded-full px-4 py-1 mb-4"
            >
              <span className="text-green-600 font-semibold text-sm">Who We Are</span>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              About the{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Platform
              </span>
            </motion.h2>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-800 mx-auto rounded-full"
            />
          </motion.div>

          {/* Main Content with Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image Section */}
            <motion.div
              variants={imageVariants}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Abia State Government House"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">4.8/5</p>
                    <p className="text-sm text-gray-600">User Rating</p>
                  </div>
                </div>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -top-6 -left-6 bg-green-600 text-white rounded-full px-4 py-2 shadow-lg"
              >
                <p className="font-semibold text-sm">Official Hub ✓</p>
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.p 
                variants={itemVariants}
                className="text-gray-600 text-lg leading-relaxed"
              >
                The <span className="font-semibold text-green-700">Abia State Digital Blog & Information Platform</span> is a 
                comprehensive digital hub dedicated to keeping citizens informed about government activities, 
                developmental projects, tourism opportunities, and public engagement initiatives.
              </motion.p>
              
              <motion.p 
                variants={itemVariants}
                className="text-gray-600 text-lg leading-relaxed"
              >
                Our mission is to bridge the gap between the government and the people through 
                <span className="font-semibold text-green-700"> transparent communication</span> and 
                <span className="font-semibold text-green-700"> accessible information</span>.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 pt-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Real-time Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Verified Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Community Driven</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.location.href = '/contact'}
            >
              Learn More About Abia State
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;