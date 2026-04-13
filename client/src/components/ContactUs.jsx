import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarker, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Show success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    tap: {
      scale: 0.98
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98
    }
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      transition: { duration: 0.5 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Africa Map Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="none">
          <path 
            d="M500,100 L520,120 L540,110 L560,130 L580,125 L600,140 L620,135 L640,150 L660,145 L680,160 L700,155 L720,170 L740,165 L760,180 L780,175 L800,190 L820,185 L840,200 L860,195 L880,210 L900,205 L920,220 L940,215 L960,230 L980,225 L1000,240 L980,260 L960,255 L940,270 L920,265 L900,280 L880,275 L860,290 L840,285 L820,300 L800,295 L780,310 L760,305 L740,320 L720,315 L700,330 L680,325 L660,340 L640,335 L620,350 L600,345 L580,360 L560,355 L540,370 L520,365 L500,380 L480,375 L460,390 L440,385 L420,400 L400,395 L380,410 L360,405 L340,420 L320,415 L300,430 L280,425 L260,440 L240,435 L220,450 L200,445 L180,460 L160,455 L140,470 L120,465 L100,480 L80,475 L60,490 L40,485 L20,500 L40,520 L60,515 L80,530 L100,525 L120,540 L140,535 L160,550 L180,545 L200,560 L220,555 L240,570 L260,565 L280,580 L300,575 L320,590 L340,585 L360,600 L380,595 L400,610 L420,605 L440,620 L460,615 L480,630 L500,625 L520,640 L540,635 L560,650 L580,645 L600,660 L620,655 L640,670 L660,665 L680,680 L700,675 L720,690 L740,685 L760,700 L780,695 L800,710 L820,705 L840,720 L860,715 L880,730 L900,725 L920,740 L940,735 L960,750 L980,745 L1000,760 L980,780 L960,775 L940,790 L920,785 L900,800 L880,795 L860,810 L840,805 L820,820 L800,815 L780,830 L760,825 L740,840 L720,835 L700,850 L680,845 L660,860 L640,855 L620,870 L600,865 L580,880 L560,875 L540,890 L520,885 L500,900 L480,895 L460,910 L440,905 L420,920 L400,915 L380,930 L360,925 L340,940 L320,935 L300,950 L280,945 L260,960 L240,955 L220,970 L200,965 L180,980 L160,975 L140,990 L120,985 L100,1000 L80,995 L60,1010 L40,1005 L20,1020 L0,1015 L0,800 L20,790 L40,780 L60,770 L80,760 L100,750 L120,740 L140,730 L160,720 L180,710 L200,700 L220,690 L240,680 L260,670 L280,660 L300,650 L320,640 L340,630 L360,620 L380,610 L400,600 L420,590 L440,580 L460,570 L480,560 L500,550 L520,540 L540,530 L560,520 L580,510 L600,500 L620,490 L640,480 L660,470 L680,460 L700,450 L720,440 L740,430 L760,420 L780,410 L800,400 L820,390 L840,380 L860,370 L880,360 L900,350 L920,340 L940,330 L960,320 L980,310 L1000,300 L1000,240 Z" 
            fill="currentColor"
            className="text-green-600"
          />
        </svg>
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-block mb-4"
            >
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-2 rounded-full inline-flex items-center gap-2 shadow-lg">
                <FaEnvelope className="text-sm" />
                <span className="text-sm font-semibold">Get In Touch</span>
              </div>
            </motion.div>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Contact Us
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Contact Info */}
            <motion.div variants={itemVariants}>
              {/* Contact Cards */}
              <div className="space-y-6">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-500 p-1" />
                  <div className="p-8">
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        variants={iconVariants}
                        whileHover="hover"
                        className="bg-green-100 rounded-full p-4"
                      >
                        <FaMapMarker className="text-green-600 text-2xl" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Government House,<br />
                          Umuahia, Abia State,<br />
                          Nigeria
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-500 p-1" />
                  <div className="p-8">
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        variants={iconVariants}
                        whileHover="hover"
                        className="bg-green-100 rounded-full p-4"
                      >
                        <FaPhone className="text-green-600 text-2xl" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                        <p className="text-gray-600 leading-relaxed">
                          <span className="block">+234 (0) 123 456 7890</span>
                          <span className="block text-sm text-gray-500 mt-1">Mon-Fri, 8am-5pm</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-500 p-1" />
                  <div className="p-8">
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        variants={iconVariants}
                        whileHover="hover"
                        className="bg-green-100 rounded-full p-4"
                      >
                        <FaEnvelope className="text-green-600 text-2xl" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600 leading-relaxed">
                          info@abiastate.gov.ng<br />
                          support@abiastate.gov.ng
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: FaFacebook, color: "bg-blue-600", href: "#" },
                      { icon: FaTwitter, color: "bg-sky-500", href: "#" },
                      { icon: FaInstagram, color: "bg-pink-600", href: "#" },
                      { icon: FaLinkedin, color: "bg-blue-700", href: "#" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${social.color} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <social.icon className="text-xl" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div variants={itemVariants}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
                  <p className="text-green-100">We'll get back to you within 24 hours</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <FaCheckCircle className="text-xl" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-xl" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Office Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 text-white"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Office Hours</h4>
                    <p className="text-gray-300">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-300">Saturday - Sunday: Closed</p>
                  </div>
                  <div className="bg-green-600 rounded-full p-3">
                    <FaClock className="text-2xl" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

// Add this if you need the Clock icon
const FaClock = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default ContactUs;