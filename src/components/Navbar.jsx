import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  DownOutlined,
  FacebookFilled,
  InstagramOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  BookOutlined,
  PictureOutlined,
  SolutionOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ theme, toggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'courses' | 'gallery' | null
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleParentClick = (e, menuName) => {
    if (window.innerWidth <= 992) {
      if (openDropdown !== menuName) {
        e.preventDefault();
        setOpenDropdown(menuName);
      } else {
        closeMobileMenu();
      }
    }
  };

  const toggleSubmenu = (e, menuName) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  return (
    <header className="header-wrapper">
      <div className="container navbar-container">
        {/* Brand Identity */}
        <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
          <div className="brand-logo-wrapper">
            <img src="/logo.webp" alt="Sam's Logo" className="brand-logo-img" />
            <span className="brand-tm-badge" title="Trademark">TM</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">Sam&apos;s</span>
            <span className="brand-tagline">CULINARY ART CLASS</span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav>
          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <HomeOutlined className="nav-link-icon" />
                <span className="nav-link-text">Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <InfoCircleOutlined className="nav-link-icon" />
                <span className="nav-link-text">About Us</span>
              </NavLink>
            </li>

            <li
              className="nav-item-with-submenu"
              onMouseEnter={() => window.innerWidth > 992 && setOpenDropdown('courses')}
              onMouseLeave={() => window.innerWidth > 992 && setOpenDropdown(null)}
            >
              <NavLink
                to="/courses"
                className={({ isActive }) => `nav-link has-submenu ${isActive ? 'active' : ''}`}
                onClick={(e) => handleParentClick(e, 'courses')}
              >
                <BookOutlined className="nav-link-icon" />
                <span className="nav-link-text">Courses</span>
                <span
                  className="submenu-arrow-trigger"
                  onClick={(e) => toggleSubmenu(e, 'courses')}
                  style={{ display: 'inline-flex', padding: '4px 6px', marginLeft: '4px', cursor: 'pointer' }}
                >
                  <DownOutlined className={`submenu-arrow ${openDropdown === 'courses' ? 'rotated' : ''}`} style={{ fontSize: '10px' }} />
                </span>
              </NavLink>
              <ul className={`submenu ${openDropdown === 'courses' ? 'submenu-visible' : ''}`}>
                <li className="submenu-item">
                  <Link to="/courses?category=Traditional Cuisines" onClick={closeMobileMenu}>Traditional Cuisines</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/courses?category=International Cuisines" onClick={closeMobileMenu}>International Cuisines</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/courses?category=Baking %26 Pastry" onClick={closeMobileMenu}>Baking &amp; Pastry</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/courses?category=Preservation %26 Drinks" onClick={closeMobileMenu}>Preservation &amp; Drinks</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/courses?category=Health %26 Wellness" onClick={closeMobileMenu}>Health &amp; Wellness</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/courses?category=Workshops %26 Special Batches" onClick={closeMobileMenu}>Workshops &amp; Special Batches</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/courses?category=Smart Cooking" onClick={closeMobileMenu}>Smart Cooking</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/courses?category=Consultations %26 Custom" onClick={closeMobileMenu}>Consultations &amp; Custom</Link>
                </li>
              </ul>
            </li>

            <li
              className="nav-item-with-submenu"
              onMouseEnter={() => window.innerWidth > 992 && setOpenDropdown('gallery')}
              onMouseLeave={() => window.innerWidth > 992 && setOpenDropdown(null)}
            >
              <NavLink
                to="/gallery"
                className={({ isActive }) => `nav-link has-submenu ${isActive ? 'active' : ''}`}
                onClick={(e) => handleParentClick(e, 'gallery')}
              >
                <PictureOutlined className="nav-link-icon" />
                <span className="nav-link-text">Gallery</span>
                <span
                  className="submenu-arrow-trigger"
                  onClick={(e) => toggleSubmenu(e, 'gallery')}
                  style={{ display: 'inline-flex', padding: '4px 6px', marginLeft: '4px', cursor: 'pointer' }}
                >
                  <DownOutlined className={`submenu-arrow ${openDropdown === 'gallery' ? 'rotated' : ''}`} style={{ fontSize: '10px' }} />
                </span>
              </NavLink>
              <ul className={`submenu ${openDropdown === 'gallery' ? 'submenu-visible' : ''}`}>
                <li className="submenu-item">
                  <Link to="/gallery?tab=awards" onClick={closeMobileMenu}>Awards &amp; Honours</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/gallery?tab=fcsc" onClick={closeMobileMenu}>Fireless Cooking</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/gallery?tab=guest" onClick={closeMobileMenu}>Guest Speaker</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/gallery?tab=media" onClick={closeMobileMenu}>Media &amp; Press</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/gallery?tab=supermom" onClick={closeMobileMenu}>Super Mom</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/gallery?tab=pongal" onClick={closeMobileMenu}>Pongal Celebration</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/gallery?tab=internship" onClick={closeMobileMenu}>Internship Programme</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/gallery?tab=students" onClick={closeMobileMenu}>Students Gallery</Link>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to="/careers"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <SolutionOutlined className="nav-link-icon" />
                <span className="nav-link-text">Careers</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <PhoneOutlined className="nav-link-icon contact-dialer-down" />
                <span className="nav-link-text">Contact</span>
              </NavLink>
            </li>

            {/* Mobile-Only CTA & Social Block */}
            <li className="mobile-menu-footer">
              <div className="mobile-menu-actions">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <div className="mobile-social-icons">
                  <a href="https://www.facebook.com/SamsCulinaryArtClass/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FacebookFilled />
                  </a>
                  <a href="https://www.instagram.com/samsculinaryartclassofficial/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramOutlined />
                  </a>
                </div>
              </div>
              <Link
                to="/onboarding"
                className="btn-primary mobile-enquire-btn"
                onClick={closeMobileMenu}
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}
              >
                Register Now
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Header Actions */}
        <div className="nav-cta">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          <div className="social-top-icons">
            <a
              href="https://www.facebook.com/SamsCulinaryArtClass/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-top"
              aria-label="Facebook"
            >
              <FacebookFilled style={{ fontSize: '14px' }} />
            </a>
            <a
              href="https://www.instagram.com/samsculinaryartclassofficial/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-top"
              aria-label="Instagram"
            >
              <InstagramOutlined style={{ fontSize: '14px' }} />
            </a>
          </div>

          <Link
            to="/onboarding"
            className="btn-primary"
            style={{ whiteSpace: 'nowrap', textDecoration: 'none', fontWeight: '700' }}
          >
            Register Now
          </Link>
        </div>

        {/* Mobile Header Right Bar */}
        <div className="mobile-only-header-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            className={`mobile-nav-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
