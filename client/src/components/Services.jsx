import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaNewspaper, FaComments, FaGlobe, FaHandsHelping, FaArrowRight } from 'react-icons/fa';

const services = [
  {
    icon: <FaNewspaper className="text-4xl" />,
    title: 'Latest News',
    description: 'Real-time updates on government activities and policies',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    features: ['Breaking News', 'Policy Updates', 'Press Releases']
  },
  {
    icon: <FaComments className="text-4xl" />,
    title: 'Public Engagement',
    description: 'Share your thoughts through comments and feedback',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    features: ['Feedback System', 'Community Polls', 'Town Halls']
  },
  {
    icon: <FaGlobe className="text-4xl" />,
    title: 'Tourism Information',
    description: 'Discover tourist attractions and cultural heritage',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    features: ['Tourist Spots', 'Cultural Events', 'Travel Guides']
  },
  {
    icon: <FaHandsHelping className="text-4xl" />,
    title: 'Community Support',
    description: 'Access government programs and initiatives',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    features: ['Grant Programs', 'Business Support', 'Social Services']
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 0.6
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 120,
      duration: 0.8
    }
  }
};

const ServiceCard = ({ service, index, onHoverStart, onHoverEnd, isHovered }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -10 }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`} />
        
        {/* Icon overlay */}
        <motion.div 
          className={`absolute bottom-4 left-4 ${service.bgColor} p-3 rounded-xl shadow-lg`}
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`${service.iconColor}`}>
            {service.icon}
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <motion.h3 
          className="text-2xl font-bold text-gray-800 mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {service.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 mb-4 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {service.description}
        </motion.p>

        {/* Features List */}
        <motion.div 
          className="space-y-2 mb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            height: isHovered ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {service.features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-center text-sm text-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${service.iconColor} mr-2`} />
              {feature}
            </motion.div>
          ))}
        </motion.div>

        {/* Learn More Button */}
        <motion.button
          className={`flex items-center text-sm font-semibold ${service.iconColor} hover:opacity-80 transition-opacity`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
          <FaArrowRight className="ml-2 text-xs" />
        </motion.button>
      </div>

      {/* Decorative border */}
      <motion.div 
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.color}`}
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="bg-green-100 rounded-full px-4 py-2">
              <span className="text-green-600 font-semibold text-sm">What We Offer</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our Comprehensive{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Empowering citizens through digital transformation and accessible government services
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              isHovered={hoveredIndex === index}
            />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '50+', label: 'News Updates', icon: '📰' },
            { number: '10K+', label: 'Active Users', icon: '👥' },
            { number: '25+', label: 'Tourist Spots', icon: '📍' },
            { number: '100%', label: 'Satisfaction', icon: '⭐' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-md"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of citizens already benefiting from our services
          </p>
          <motion.button
            className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;