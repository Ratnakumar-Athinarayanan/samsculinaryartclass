import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import page components
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import AdminWebinars from './pages/AdminWebinars';
import Onboarding from './pages/Onboarding';

// Scroll Reset helper component to scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent({ theme, toggleTheme }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="app-shell-wrapper">
      {/* Navigation Bar Header (Hidden on Admin routes) */}
      {!isAdmin && <Navbar theme={theme} toggleTheme={toggleTheme} />}

      {/* Dynamic Route Content */}
      <main className="main-content-router" style={isAdmin ? { paddingTop: '0px', minHeight: '100vh' } : undefined}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/webinars" element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<Navigate to="/admin/webinars" replace />} />
          <Route path="/admin/webinars" element={<AdminWebinars />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/register" element={<Onboarding />} />
          {/* Fallback redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Branding Footer (Hidden on Admin routes) */}
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    // Read theme from localStorage or default to 1st priority 'dark'
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('sams-theme');
      return savedTheme || 'dark';
    }
    return 'dark';
  });

  // Apply class changes to root html tag whenever theme switches
  useEffect(() => {
    const rootElement = document.documentElement;
    if (theme === 'dark') {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
    localStorage.setItem('sams-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AppContent theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}
