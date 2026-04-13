import React from "react";
import { motion } from "framer-motion";

const AbiaMap = () => {
  return (
    <div>
      {" "}
      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-16"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-96 bg-gray-200 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1018180.895578476!2d7.000441529010766!3d5.532618938071222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104254e2a67bf8b3%3A0x9f4b5b8c5b8c5b8c!2sAbia%20State!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Abia State Map"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AbiaMap;
