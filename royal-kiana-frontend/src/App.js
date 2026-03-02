import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import Policies from './pages/Policies';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import StaffPortal from './pages/StaffPortal';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTopOnMount />
          <div className="App min-h-screen flex flex-col">
            <Navbar />
            <ScrollToTop />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/policies" element={<Policies />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/staff-portal" element={<StaffPortal />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
