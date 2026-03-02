import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1920&q=80',
      title: 'Welcome to',
      subtitle: 'Royal Kiana Suites',
      description: 'Experience luxury and comfort in the heart of Lagos'
    },
    {
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80',
      title: 'Luxury',
      subtitle: 'Accommodations',
      description: 'Where every moment becomes a cherished memory'
    },
    {
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80',
      title: 'Premium',
      subtitle: 'Hospitality',
      description: 'Discover the perfect blend of comfort and elegance'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900 dark:bg-black">
      {/* Background Images with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          />
          {/* Gradient Overlay - Better for dark mode */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-black/80 dark:via-black/60 dark:to-black/90" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Small Title */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-primary-400 dark:text-primary-300 text-sm md:text-base lg:text-lg font-bold tracking-wider uppercase mb-4"
              >
                {slides[currentSlide].title}
              </motion.p>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black mb-6 text-white drop-shadow-2xl"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                {slides[currentSlide].subtitle}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white dark:text-white font-semibold max-w-3xl mx-auto mb-10 px-4 drop-shadow-lg"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
              >
                <Link 
                  to="/rooms" 
                  className="w-full sm:w-auto px-8 py-4 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/50"
                >
                  Explore Rooms
                </Link>
                <Link 
                  to="/contact" 
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-300 border border-white/30 dark:border-white/20"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 sm:bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'bg-primary-500 dark:bg-primary-400 w-10 h-3' 
                : 'bg-white/40 dark:bg-white/30 hover:bg-white/60 dark:hover:bg-white/50 w-3 h-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 sm:w-7 sm:h-12 border-2 border-white/40 dark:border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-2 bg-white/60 dark:bg-white/50 rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm rounded-full border border-white/30 dark:border-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm rounded-full border border-white/30 dark:border-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
