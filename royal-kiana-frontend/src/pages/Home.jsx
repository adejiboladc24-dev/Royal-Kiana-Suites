import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import RoomCard from '../components/RoomCard';

const Home = () => {
  const featuredRooms = [
    {
      id: 1,
      name: 'Deluxe Suite',
      price: 35000,
      description: 'Spacious suite with king bed, living area, and stunning city views',
      features: ['King Bed', 'City View', 'WiFi', 'Mini Bar'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'
    },
    {
      id: 2,
      name: 'Executive Room',
      price: 50000,
      description: 'Modern room with premium amenities and workspace',
      features: ['Queen Bed', 'Work Desk', 'WiFi', 'Coffee Maker'],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'
    },
    {
      id: 3,
      name: 'Presidential Suite',
      price: 120000,
      description: 'Ultimate luxury with private terrace and butler service',
      features: ['Master Bedroom', 'Terrace', 'Butler', 'Jacuzzi'],
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'
    }
  ];

  return (
    <div>
      <Hero />

      {/* Floating Easy Sign Up Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Link
          to="/signup"
          className="group flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span className="font-semibold text-lg hidden sm:inline">Easy Sign Up</span>
          <span className="font-semibold text-lg sm:hidden">Sign Up</span>
        </Link>
      </motion.div>

      {/* Featured Rooms Section */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-2">
              Discover
            </p>
            <h2 className="section-title">Featured Rooms</h2>
            <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto mt-4">
              Immerse yourself in luxury with our carefully curated selection of premium accommodations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/rooms" className="btn-primary inline-flex items-center space-x-2">
              <span>View All Rooms</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Modern gradient background with pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Accent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-primary-500/10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Happy Guests', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )},
              { number: '50+', label: 'Luxury Rooms', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              )},
              { number: '10+', label: 'Years Experience', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              )},
              { number: '24/7', label: 'Support', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-primary-400 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{stat.number}</div>
                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Offers Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Exclusive Offers
            </h2>
            <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto text-lg">
              Discover our curated experiences designed to create unforgettable memories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Honeymoon Package */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl h-80 group cursor-pointer"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-600/50 to-transparent group-hover:from-pink-900/95 transition-all duration-300"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                    25% OFF
                  </span>
                </div>
                <div className="text-white">
                  <h3 className="text-3xl font-display font-bold mb-2">Honeymoon Packages</h3>
                  <p className="text-white/90 mb-4">Romantic getaways with exclusive perks</p>
                  <button className="px-6 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl text-white font-medium transition-all duration-300 border border-white/30">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Spa & Wellness */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl h-80 group cursor-pointer"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-600/50 to-transparent group-hover:from-green-900/95 transition-all duration-300"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                    30% OFF
                  </span>
                </div>
                <div className="text-white">
                  <h3 className="text-3xl font-display font-bold mb-2">Spa & Wellness</h3>
                  <p className="text-white/90 mb-4">Rejuvenate your mind, body & soul</p>
                  <button className="px-6 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl text-white font-medium transition-all duration-300 border border-white/30">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Fine Dining */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl h-80 group cursor-pointer"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-600/50 to-transparent group-hover:from-orange-900/95 transition-all duration-300"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                    Free Drinks
                  </span>
                </div>
                <div className="text-white">
                  <h3 className="text-3xl font-display font-bold mb-2">Fine Dining</h3>
                  <p className="text-white/90 mb-4">Authentic Nigerian and international cuisine</p>
                  <button className="px-6 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl text-white font-medium transition-all duration-300 border border-white/30">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Lagos Tours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-3xl h-80 group cursor-pointer"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-600/50 to-transparent group-hover:from-blue-900/95 transition-all duration-300"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                  20% OFF
                </span>
              </div>
              <div className="text-white">
                <h3 className="text-3xl font-display font-bold mb-2">Lagos Tours</h3>
                <p className="text-white/90 mb-4">Explore the vibrant culture of Lagos with our guided tours</p>
                <button className="px-6 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl text-white font-medium transition-all duration-300 border border-white/30">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-2">
              Premium
            </p>
            <h2 className="section-title">Our Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                ),
                title: 'Fine Dining', 
                desc: 'World-class cuisine',
                color: 'orange'
              },
              { 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: 'Spa & Wellness', 
                desc: 'Rejuvenate your senses',
                color: 'green'
              },
              { 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6h18M3 12h18M3 18h18" />
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9c1-1 2-1.5 4-1.5s3 .5 4 1.5M8 15c1 1 2 1.5 4 1.5s3-.5 4-1.5"/>
                  </svg>
                ),
                title: 'Pool & Fitness', 
                desc: 'Stay active and refreshed',
                color: 'blue'
              },
              { 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 9l-3-3-3 3M9 15l3 3 3-3" />
                  </svg>
                ),
                title: 'Event Spaces', 
                desc: 'Perfect for celebrations',
                color: 'purple'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card-premium text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-${service.color}-100 dark:bg-${service.color}-900/30 rounded-2xl flex items-center justify-center text-${service.color}-600 dark:text-${service.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-white/60 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Portal CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 dark:from-dark-900 dark:via-primary-900/50 dark:to-dark-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Staff Management Portal
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Manage bookings, view statistics, and handle guest operations efficiently
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-10"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Real-time Stats</h3>
                <p className="text-white/70 text-sm">Monitor bookings and occupancy</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Manage Bookings</h3>
                <p className="text-white/70 text-sm">Update status and view details</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Guest Management</h3>
                <p className="text-white/70 text-sm">Access guest information</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Link
                to="/staff-portal"
                className="inline-flex items-center space-x-3 bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Access Staff Portal</span>
              </Link>
              <p className="text-white/60 text-sm mt-4">
                Staff credentials required • Secure access only
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-2">
              Testimonials
            </p>
            <h2 className="section-title">What Our Guests Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Adebayo Johnson',
                role: 'Business Executive',
                image: 'https://ui-avatars.com/api/?name=Adebayo+Johnson&background=f97316&color=fff&size=128',
                text: 'Exceptional service and luxurious rooms. Royal Kiana exceeded all my expectations. The staff went above and beyond to make my stay memorable.',
                rating: 5
              },
              {
                name: 'Chioma Okafor',
                role: 'Event Planner',
                image: 'https://ui-avatars.com/api/?name=Chioma+Okafor&background=f97316&color=fff&size=128',
                text: 'Perfect venue for our corporate event. The event spaces are stunning and the team was incredibly professional. Highly recommended!',
                rating: 5
              },
              {
                name: 'Michael Eze',
                role: 'Tourist',
                image: 'https://ui-avatars.com/api/?name=Michael+Eze&background=f97316&color=fff&size=128',
                text: 'A true gem in Lagos! The location is perfect, rooms are immaculate, and the dining experience was world-class. Will definitely return.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-white/70 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
