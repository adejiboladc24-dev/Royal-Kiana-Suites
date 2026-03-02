import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-20 bg-gray-50 dark:bg-dark-900">
      <section className="relative py-32 overflow-hidden">
        {/* Background Image - Hotel Building Exterior */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80)'
          }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              About Royal Kiana Hotel
            </h1>
            <p className="text-xl text-gray-200">Your home away from home in Lagos</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Welcome to Excellence
              </h2>
              <p className="text-gray-600 dark:text-white/70 mb-4 leading-relaxed">
                Royal Kiana Hotel is a premier hospitality destination located in the heart of Lagos, Nigeria. 
                We pride ourselves on delivering exceptional service, luxurious accommodations, and unforgettable experiences.
              </p>
              <p className="text-gray-600 dark:text-white/70 mb-4 leading-relaxed">
                Since our establishment, we have been committed to providing our guests with world-class amenities, 
                comfortable rooms, and personalized service that exceeds expectations.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Whether you're visiting for business or leisure, Royal Kiana Hotel offers the perfect blend of 
                comfort, convenience, and Nigerian hospitality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl p-12 text-center"
            >
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-700/10"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 bg-primary-100 dark:bg-primary-900/30 rounded-3xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  Premium Hospitality
                </h3>
                <p className="text-gray-600 dark:text-white/70">
                  Dedicated staff ensuring your comfort 24/7
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-dark-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
              Discover what makes Royal Kiana Hotel the preferred choice for travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: 'Luxury Rooms', 
                desc: 'Elegantly designed rooms with modern amenities',
                color: 'blue'
              },
              { 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                ),
                title: 'Fine Dining', 
                desc: 'Exquisite cuisine from local and international chefs',
                color: 'orange'
              },
              { 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Prime Location', 
                desc: 'Conveniently located in Lagos with easy access',
                color: 'green'
              },
              { 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Business Facilities', 
                desc: 'Conference rooms and business center',
                color: 'purple'
              },
              { 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Recreation', 
                desc: 'Pool, gym, and wellness facilities',
                color: 'cyan'
              },
              { 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                ),
                title: 'Free Parking', 
                desc: 'Secure parking for all guests',
                color: 'gray'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-4 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-2xl flex items-center justify-center text-${feature.color}-600 dark:text-${feature.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-white/60 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Ready to Experience Luxury?
            </h2>
            <p className="text-gray-600 dark:text-white/60 mb-8 max-w-2xl mx-auto">
              Book your stay at Royal Kiana Hotel and discover the perfect blend of comfort and elegance
            </p>
            <a href="/booking" className="btn-primary inline-block">
              Book Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
