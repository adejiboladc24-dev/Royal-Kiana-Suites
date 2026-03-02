import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Services', path: '/about' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-gray-900 shadow-2xl' 
          : isHomePage
          ? 'bg-white/10 dark:bg-black/30 backdrop-blur-md border-b border-white/20 dark:border-white/10'
          : 'bg-white dark:bg-gray-900 shadow-lg'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-display font-bold"
            >
              <span className={
                (isHomePage && !scrolled) 
                  ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                  : "text-gray-900 dark:text-white"
              }>Royal Kiana</span>{' '}
              <span className={
                (isHomePage && !scrolled)
                  ? "text-primary-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  : "text-primary-600 dark:text-primary-400"
              }>Suites</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-lg font-bold transition-colors ${
                  location.pathname === link.path
                    ? (isHomePage && !scrolled)
                      ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                      : 'text-primary-600 dark:text-primary-400'
                    : (isHomePage && !scrolled)
                    ? 'text-white/95 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                    : 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                      (isHomePage && !scrolled) ? 'bg-white' : 'bg-primary-500'
                    }`}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
              }}
              className={`p-2.5 rounded-lg transition-all ${
                (isHomePage && !scrolled)
                  ? 'hover:bg-white/20 dark:hover:bg-white/10 bg-white/10'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-label="Toggle theme"
              type="button"
            >
              {theme === 'dark' ? (
                <svg className={`w-6 h-6 ${(isHomePage && !scrolled) ? 'text-white drop-shadow-lg' : 'text-yellow-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className={`w-6 h-6 ${(isHomePage && !scrolled) ? 'text-white drop-shadow-lg' : 'text-gray-700 dark:text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 text-base font-bold transition-colors ${
                    (isHomePage && !scrolled)
                      ? 'text-white/95 hover:text-white drop-shadow-lg'
                      : 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={logout} 
                  className={`text-base font-bold transition-colors ${
                    (isHomePage && !scrolled)
                      ? 'text-white/95 hover:text-white drop-shadow-lg'
                      : 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  Logout
                </button>
                <Link to="/booking" className="btn-primary text-base font-semibold px-7 py-3 shadow-lg">
                  Book Now
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`text-base font-bold transition-colors ${
                    (isHomePage && !scrolled)
                      ? 'text-white/95 hover:text-white drop-shadow-lg'
                      : 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-base font-semibold px-7 py-3 shadow-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
              }}
              className={`p-2 rounded-lg transition-all ${
                (isHomePage && !scrolled)
                  ? 'hover:bg-white/20 dark:hover:bg-white/10'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-label="Toggle theme"
              type="button"
            >
              {theme === 'dark' ? (
                <svg className={`w-5 h-5 ${(isHomePage && !scrolled) ? 'text-white drop-shadow-lg' : 'text-yellow-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className={`w-5 h-5 ${(isHomePage && !scrolled) ? 'text-white drop-shadow-lg' : 'text-gray-700 dark:text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${
                (isHomePage && !scrolled) 
                  ? 'text-white drop-shadow-lg' 
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 text-base font-semibold ${
                  location.pathname === link.path ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 space-y-3 border-t border-gray-200 dark:border-gray-800">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-base font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 py-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                  <button 
                    onClick={() => { logout(); setMobileMenuOpen(false); }} 
                    className="flex items-center space-x-2 text-base font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 py-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-base font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 py-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-base font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 py-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
              <Link 
                to="/booking" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 btn-primary text-center py-3 mt-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold">Book Now</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
